import path from 'path';
import multer from 'multer';
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg'){
            cb(new Error('File type not supported'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;