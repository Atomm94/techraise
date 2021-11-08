import multer from 'multer';

const storage = multer.diskStorage({
    destination: './Media/',
    filename: async function(req, file, cb) {
        cb(null, file.originalname.replace(/\W+/g, '-').toLowerCase() + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});

const imageFilter = function(req, file, cb) {
    //.png, .jpeg, .jpg, .pdf, .xlsx, .csv, .gif, .ppt
    if (!file.originalname.match(/\.(PDF|pdf|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|ppt|PPT|xlsx|)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const fileFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp4|mov|wmv|flv|WebM|mkv|)$/)) {
        req.fileValidationError = 'Only video files are allowed!';
        return cb(new Error('Only video files are allowed!'), false);
    }
    cb(null, true);
};

export {
    storage,
    imageFilter,
    fileFilter
}