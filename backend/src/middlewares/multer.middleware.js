import multer from "multer";

const storage = multer.diskStorage({ // This function return a filename which will be used to upload files to cloudinary
    destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({
    storage,
    // storage: storage
})