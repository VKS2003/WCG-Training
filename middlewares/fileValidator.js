import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4()+'-'+file.originalname)
    }
  })
  
const upload = multer({
    storage: storage,
    limits: {
        fileSize:  2 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
          return cb(new Error('Invalid file type'));
        }
        cb(null, true);
    }
}).single('emp_resume')

export const fileValidator = function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.json({ type: 'error', message: `Multer Error :${err.message}` })
        } else if (err) {
          return res.json({ type: 'error', message: err.message })
        }
      next()
    })
}