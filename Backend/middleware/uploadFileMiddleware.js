const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads') // Temporary directory for files
    },
    filename: (req, file, cb) => {
        const cleanName = file.originalname.replace(/\s+/g, '_'); // ← remove spaces
        const uniqueName = `${Date.now()}-${cleanName}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Only jpeg, jpg, png files are allowed'));
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit size 5Mb
});

module.exports = upload;