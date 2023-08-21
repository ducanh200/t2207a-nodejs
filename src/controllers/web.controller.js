const { get } = require("http");
const { all } = require("../routes/web");
const Product = require("./../models/product.model");

const fs = require("fs");

exports.home = (req,res)=>{
    // res.send("Hello T2207A");
    var c = "T2207A";
    var students = [
        "Nguyễn Đức Anh",
        "Nguyễn Đức Duy",
        "Nguyễn Văn A"
    ];
    res.render("home",{
        className : c , 
        students : students
    });
}

exports.about = (req,res)=>{
    // res.send("About me");
    res.render("about");
}


exports.register = (req,res)=>{
    res.render("register");
}

exports.products = async(req,res)=>{
    try {
        const products =await Product.find();
        res.render("products",{
            products : products
        })
    } catch (error) {
        
    }
   
}

exports.product_form = (req,res)=>{
    const data = req.body;
    res.render("product_form",{product:data});
}

exports.add_product = async (req,res)=>{
    const data = req.body;
    const file = req.file;
    if(file){
        const img = fs.readFileSync(file.path); 
        data.thumbnail = {
            contentType : file.mimetype,
            data:img.toString("base64")

        }
    }
    
    try {
        // data.thumbnail = `/uploads/${file.filename}`;
        const p = new Product(data);
        await p.save(); 
            res.redirect("/products");
    } catch (error) {
        res.render("/product_form",{product:data,error:error});
    }
   
}