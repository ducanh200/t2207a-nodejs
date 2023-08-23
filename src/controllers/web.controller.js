const { get } = require("http");
const { all } = require("../routes/web");
const Product = require("./../models/product.model");


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

