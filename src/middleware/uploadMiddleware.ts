import multer from "multer";

import {dirname} from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("req",dirname)
       
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        console.log("file",file);
        cb(null, file.fieldname + '-' + req.params.id)
    }
})
export default multer({storage:storage})
