
const cloudinary = require('../config/cloudinary');
const { File } = require('../models');


exports.uploadToCloudinary = async (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    
    // Remove 'v1/' and folder path from public_id
    const publicId = `file_${Date.now()}_${sanitizedName}`;
    
    console.log('📤 Uploading to Cloudinary with public_id:', publicId);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'file-share', // Folder will be automatically included
        public_id: publicId, // Just the filename, no path
        use_filename: true,
        unique_filename: true,
        overwrite: false
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('✅ Cloudinary upload successful:');
          console.log('   Public ID:', result.public_id);
          console.log('   URL:', result.secure_url);
          console.log('   Format:', result.format);
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};
exports.deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

exports.uploadFiles = async (files, transferId) => {
  console.log(`📤 Starting upload of ${files.length} files to Cloudinary...`);
  
  const fileUploads = files.map(async (file, index) => {
    try {
      console.log(`⬆️ Uploading file ${index + 1}: ${file.originalname}`);
      
      // Upload to Cloudinary
      const uploadResult = await exports.uploadToCloudinary(file.buffer, file.originalname);

      // Create file record in database
      const fileRecord = await File.create({
        filename: file.originalname,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        cloudinaryUrl: uploadResult.secure_url,
        cloudinaryPublicId: uploadResult.public_id,
        transferId: transferId
      });

      console.log(`✅ File uploaded: ${file.originalname}`);
      return fileRecord;
    } catch (error) {
      console.error(`❌ Error uploading file ${file.originalname}:`, error);
      throw error;
    }
  });

  const results = await Promise.all(fileUploads);
  console.log(`🎉 All ${files.length} files uploaded successfully`);
  return results;
};

exports.getFileInfo = async (fileId) => {
  try {
    const file = await File.findByPk(fileId, {
      include: ['Transfer']
    });

    if (!file) {
      throw new Error('File not found');
    }

    return file;
  } catch (error) {
    console.error('Error getting file info:', error);
    throw error;
  }
};

// Test Cloudinary connection
exports.testCloudinary = async () => {
  try {
    // Try to list resources to test connection
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 1
    });
    console.log('✅ Cloudinary connection test passed');
    return true;
  } catch (error) {
    console.error('❌ Cloudinary connection test failed:', error.message);
    return false;
  }
};