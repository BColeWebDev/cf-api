import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log("file", file);
    cb(null, file.fieldname + "-" + req.params.id + ".jpg");
  },
});

export default multer({ storage: storage });
