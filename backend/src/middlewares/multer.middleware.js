import multer from "multer";
/*
 THis multer middleware is extremely important because it doesn't just upload files on the local disk, it PARSES the
 Multipart/form-data Http request to js object style also, the normal data goes to req.body and file go to req.file or req.files(as per ur choice in number of files)
*/

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