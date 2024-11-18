import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
    cb(new Error('File type not supported'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;