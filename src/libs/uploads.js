import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

function fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (!allowedTypes.test(ext) || !allowedTypes.test(mime)) {
        return cb(new Error("File type tidak valid. Hanya jpeg, jpg, png yang diizinkan."));
    }

    cb(null, true);
}

export const upload = multer({ 
    storage, 
    fileFilter, 
    limits: { fileSize: 2 * 1024 * 1024 } 
});