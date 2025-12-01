const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Setup S3/MinIO client
const s3 = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.MINIO_ENDPOINT || 'http://localhost:9000',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretAccessKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
  }
});

// Setup multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed! 📸'), false);
    }
  }
});

// Upload image
router.post('/', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded! 📸' });
    }

    const fileName = `${Date.now()}-${req.user.id}-${req.file.originalname}`;
    
    const params = {
      Bucket: process.env.MINIO_BUCKET || 'betterme-uploads',
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    await s3.send(new PutObjectCommand(params));

    const fileUrl = `${process.env.MINIO_ENDPOINT}/${params.Bucket}/${fileName}`;

    res.json({
      message: 'Photo uploaded successfully! 📸✨',
      url: fileUrl,
      fileName
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed. Try again! 💔' });
  }
});

module.exports = router;



