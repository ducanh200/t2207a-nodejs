const express = require("express");
const router = express.Router();

const controller = require("./../controllers/web.controller");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"public/uploads");
    },
    filename : (req,file,callback)=>{
        callback(null,Date.now()+"-"+file.originalname);
    }
});
const uploads = multer({storage:storage});

router.get("/",controller.home)

router.get("/about",controller.about);

module.exports = router;
