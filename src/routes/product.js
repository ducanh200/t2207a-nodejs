const express = require("express");
const router = express.Router();
const controller = require("./../controllers/product.controller");

// upload file
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        if(file)
            callback(null,"public/uploads");
    },
    filename: (req,file,callback)=>{
        if(file)
            callback(null,Date.now()+"-"+file.originalname);
    }
});
const upload = multer({storage:storage});

router.get("/",controller.list);
router.get("/create",controller.formCreate);
router.post("/create",upload.single("thumbnail"),controller.create);
router.get("/edit/:id",controller.formEdit);
router.post("/edit/:id",upload.single("thumbnail"),controller.update);
router.get("/delete/:id",controller.delete);

module.exports = router;