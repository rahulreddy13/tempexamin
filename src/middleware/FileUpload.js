import multer from 'multer';
import mongoose from 'mongoose'

  const storage = multer.diskStorage({

      destination: function (req, file, cb) {

        cb(null, './uploads/');

      }, filename: function (req, file, cb) {
        let ext = file.mimetype.split('/')[1]
        cb(null, mongoose.Types.ObjectId() + '.' + ext);
      }

  });

  const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4' || file.mimetype === 'application/pdf' || file.mimetype === 'application/zip' || file.mimetype === 'application/vnd.rar') { cb(null, true); }
    else { cb(null, false); }

  };


const SingleFileUpload = (Field_Name) => {
  
  return async function(req, res, next) {
    
    const upload = multer({ storage: storage, fileFilter: fileFilter }).single(Field_Name)

        upload(req,res,next,function(err){   

          if(err){

            res.json({ success:false,message:err });

          }else{

            next()

          } 
      });
  }

}

module.exports = { SingleFileUpload };
