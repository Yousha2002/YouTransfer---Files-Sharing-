const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Upload single file
router.post('/single', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadResult = await uploadController.uploadToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    res.json({
      message: 'File uploaded successfully',
      file: {
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Upload multiple files
router.post('/multiple', auth, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadResults = await Promise.all(
      req.files.map(file =>
        uploadController.uploadToCloudinary(file.buffer, file.originalname)
      )
    );

    const files = uploadResults.map((result, index) => ({
      originalName: req.files[index].originalname,
      size: req.files[index].size,
      mimetype: req.files[index].mimetype,
      url: result.secure_url,
      publicId: result.public_id
    }));

    res.json({
      message: 'Files uploaded successfully',
      files: files
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Delete file
router.delete('/:publicId', auth, async (req, res) => {
  try {
    const { publicId } = req.params;

    const result = await uploadController.deleteFromCloudinary(publicId);

    if (result.result === 'ok') {
      // Also delete from database if needed
      await File.destroy({ where: { cloudinaryPublicId: publicId } });

      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
});

module.exports = router;