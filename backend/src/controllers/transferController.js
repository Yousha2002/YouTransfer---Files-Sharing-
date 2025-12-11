const { Transfer, File, User } = require('../models');
const cloudinary = require('../config/cloudinary');
const { sendTransferEmail, sendTestEmail } = require('../utils/email');
const { Op } = require('sequelize');
const crypto = require('crypto');

// Fixed link generation
const generateShareLink = () => {
  return 'we2tit-' + crypto.randomBytes(8).toString('hex');
};

exports.createTransfer = async (req, res) => {
  try {
    const { title, message, expiration, sendMethod, recipientEmail } = req.body;
    const files = req.files;

    console.log('📥 Received transfer request:', {
      title,
      sendMethod,
      recipientEmail,
      fileCount: files?.length
    });

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Calculate expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + parseInt(expiration));

    // Generate unique share link
    const shareLink = generateShareLink();
    const downloadUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/download/${shareLink}`;

    console.log('🔗 Generated share link:', shareLink);

    // Create transfer
    const transfer = await Transfer.create({
      title,
      message,
      shareLink: shareLink,
      expiration: expirationDate,
      sendMethod,
      recipientEmail,
      userId: req.user.id
    });

    console.log('✅ Transfer created in database');

    // Upload files to Cloudinary
    const uploadController = require('./uploadController');
    await uploadController.uploadFiles(files, transfer.id);

    console.log('☁️  Files uploaded to Cloudinary');

    // Send email if sendMethod is email
    if (sendMethod === 'email' && recipientEmail) {
      try {
        console.log('📧 Attempting to send email to:', recipientEmail);
        
        let emailSent = false;
        
        // Check if email credentials are configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          emailSent = await sendTransferEmail(recipientEmail, downloadUrl, title, message);
        } else {
          // Use test email for development
          emailSent = await sendTestEmail(recipientEmail, downloadUrl, title);
          console.log('ℹ️  Using test email (no SMTP configured)');
        }
        
        if (emailSent) {
          console.log('✅ Email notification sent successfully');
        } else {
          console.log('⚠️  Email sending failed, but transfer was created');
        }
      } catch (emailError) {
        console.error('❌ Email sending error:', emailError);
        // Continue even if email fails
      }
    }

    // Get transfer with files for response
    const transferWithFiles = await Transfer.findByPk(transfer.id, {
      include: [File]
    });

    console.log('🎉 Transfer process completed successfully');

    // Return the share link in response
    res.status(201).json({
      message: 'Transfer created successfully',
      transfer: transferWithFiles,
      shareLink: shareLink,
      downloadUrl: downloadUrl,
      emailSent: sendMethod === 'email'
    });

  } catch (error) {
    console.error('💥 Transfer creation error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.getUserTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.findAll({
      where: { userId: req.user.id },
      include: [File],
      order: [['createdAt', 'DESC']]
    });

    res.json(transfers);
  } catch (error) {
    console.error('Error fetching user transfers:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTransferByLink = async (req, res) => {
  try {
    const { link } = req.params;

    console.log('🔍 Looking for transfer with link:', link);

    const transfer = await Transfer.findOne({
      where: { 
        shareLink: link,
        isActive: true,
        expiration: { [Op.gt]: new Date() }
      },
      include: [File]
    });

    if (!transfer) {
      console.log('❌ Transfer not found or expired');
      return res.status(404).json({ message: 'Transfer not found or expired' });
    }

    console.log('✅ Transfer found:', transfer.title);

    // Increment download count
    await transfer.increment('downloadCount');

    res.json(transfer);
  } catch (error) {
    console.error('Error fetching transfer by link:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};





exports.downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    console.log('📥 Download request for file ID:', fileId);

    const file = await File.findByPk(fileId, {
      include: [{
        model: Transfer,
        where: { 
          isActive: true,
          expiration: { [Op.gt]: new Date() }
        }
      }]
    });

    if (!file) {
      console.log('❌ File not found or transfer expired');
      return res.status(404).json({ message: 'File not found or transfer expired' });
    }

    console.log('📄 File found:', file.originalName);

    // Cloudinary se file stream karein
    const cloudinaryUrl = file.cloudinaryUrl;
    
    // Cloudinary se file fetch karein
    const response = await fetch(cloudinaryUrl);
    
    if (!response.ok) {
      throw new Error(`Cloudinary error: ${response.status} ${response.statusText}`);
    }

    // File data buffer mein lein
    const fileBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Download headers set karein
    res.setHeader('Content-Type', file.mimetype || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

    // File directly send karein
    res.send(buffer);

    console.log('✅ File sent directly to client');

  } catch (error) {
    console.error('❌ Download error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Download failed', 
      error: error.message 
    });
  }
};


// new
// Add this to your existing exports
exports.deleteTransfer = async (req, res) => {
  try {
    const { transferId } = req.params;
    const userId = req.user.id;

    console.log(`🗑️ Delete request for transfer ID: ${transferId} by user: ${userId}`);

    // Find the transfer
    const transfer = await Transfer.findByPk(transferId, {
      include: [File]
    });

    if (!transfer) {
      console.log('❌ Transfer not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Transfer not found' 
      });
    }

    // Check if user owns the transfer
    if (transfer.userId !== userId) {
      console.log('⛔ Unauthorized delete attempt');
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this transfer' 
      });
    }

    console.log(`📁 Transfer found. Files to delete: ${transfer.Files.length}`);

    // Delete files from Cloudinary
    const uploadController = require('./uploadController');
    let cloudinaryDeleteCount = 0;
    let cloudinaryErrors = [];

    for (const file of transfer.Files) {
      if (file.cloudinaryPublicId) {
        try {
          console.log(`☁️  Deleting from Cloudinary: ${file.cloudinaryPublicId}`);
          await uploadController.deleteFromCloudinary(file.cloudinaryPublicId);
          cloudinaryDeleteCount++;
          console.log(`✅ Deleted from Cloudinary: ${file.cloudinaryPublicId}`);
        } catch (cloudinaryError) {
          console.error(`❌ Cloudinary delete error for ${file.cloudinaryPublicId}:`, cloudinaryError.message);
          cloudinaryErrors.push({
            fileId: file.id,
            filename: file.originalName,
            error: cloudinaryError.message
          });
        }
      }
    }

    // Delete files from database
    const fileDeleteCount = await File.destroy({
      where: { transferId: transferId }
    });

    console.log(`🗃️ Deleted ${fileDeleteCount} files from database`);

    // Delete the transfer record
    await Transfer.destroy({
      where: { id: transferId }
    });

    console.log(`✅ Transfer ${transferId} deleted successfully`);

    // Prepare response
    const response = {
      success: true,
      message: 'Transfer deleted successfully',
      details: {
        transferId: transferId,
        filesDeleted: {
          cloudinary: cloudinaryDeleteCount,
          database: fileDeleteCount
        },
        title: transfer.title,
        shareLink: transfer.shareLink
      }
    };

    // Add warnings if there were Cloudinary errors
    if (cloudinaryErrors.length > 0) {
      response.warnings = {
        message: 'Some files could not be deleted from Cloudinary (still deleted from database)',
        errors: cloudinaryErrors
      };
      console.warn('⚠️ Some Cloudinary deletions failed:', cloudinaryErrors);
    }

    res.json(response);

  } catch (error) {
    console.error('💥 Transfer deletion error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during deletion', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Optional: Soft delete alternative (if you want to keep records)
exports.deactivateTransfer = async (req, res) => {
  try {
    const { transferId } = req.params;
    const userId = req.user.id;

    console.log(`🔒 Deactivating transfer ID: ${transferId}`);

    const transfer = await Transfer.findOne({
      where: { 
        id: transferId,
        userId: userId 
      }
    });

    if (!transfer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transfer not found or not authorized' 
      });
    }

    // Soft delete by deactivating
    transfer.isActive = false;
    await transfer.save();

    console.log(`✅ Transfer ${transferId} deactivated`);

    res.json({
      success: true,
      message: 'Transfer deactivated successfully',
      transfer: {
        id: transfer.id,
        title: transfer.title,
        isActive: transfer.isActive,
        shareLink: transfer.shareLink
      }
    });

  } catch (error) {
    console.error('Error deactivating transfer:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Optional: Bulk delete transfers
exports.bulkDeleteTransfers = async (req, res) => {
  try {
    const { transferIds } = req.body; // Array of transfer IDs
    const userId = req.user.id;

    if (!Array.isArray(transferIds) || transferIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of transfer IDs to delete'
      });
    }

    console.log(`🗑️ Bulk delete request for ${transferIds.length} transfers`);

    // Verify ownership and get transfers with files
    const transfers = await Transfer.findAll({
      where: {
        id: { [Op.in]: transferIds },
        userId: userId
      },
      include: [File]
    });

    if (transfers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No transfers found or not authorized'
      });
    }

    const uploadController = require('./uploadController');
    let totalFilesDeleted = 0;
    let totalCloudinaryDeleted = 0;
    const results = [];

    // Process each transfer
    for (const transfer of transfers) {
      const result = {
        transferId: transfer.id,
        title: transfer.title,
        filesCount: transfer.Files.length,
        status: 'pending'
      };

      try {
        // Delete from Cloudinary
        for (const file of transfer.Files) {
          if (file.cloudinaryPublicId) {
            try {
              await uploadController.deleteFromCloudinary(file.cloudinaryPublicId);
              totalCloudinaryDeleted++;
            } catch (error) {
              console.warn(`Could not delete from Cloudinary: ${file.cloudinaryPublicId}`);
            }
          }
        }

        // Delete files from database
        const fileDeleteCount = await File.destroy({
          where: { transferId: transfer.id }
        });
        totalFilesDeleted += fileDeleteCount;

        // Delete transfer
        await Transfer.destroy({
          where: { id: transfer.id }
        });

        result.status = 'success';
        result.message = 'Deleted successfully';

      } catch (error) {
        result.status = 'error';
        result.message = error.message;
      }

      results.push(result);
    }

    console.log(`✅ Bulk delete completed. ${transfers.length} transfers processed`);

    res.json({
      success: true,
      message: `Bulk delete completed for ${transfers.length} transfers`,
      summary: {
        transfersDeleted: transfers.length,
        filesDeleted: totalFilesDeleted,
        cloudinaryFilesDeleted: totalCloudinaryDeleted
      },
      details: results
    });

  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during bulk delete',
      error: error.message
    });
  }
};