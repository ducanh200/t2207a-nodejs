const Product = require("./../models/product.model");
const fs = require("fs");
exports.list = async (req,res)=>{
    try {
        const rs = await Product.find();
        res.render("product/products",{
            products:rs
        });
    } catch (error) {
        
    }
}
exports.formCreate = (req,res)=>{
    const data = req.body;
    // console.log(req._parsedOriginalUrl.path)
    data.url = req._parsedOriginalUrl.path;
    res.render("product/form",{
        product:data
    });
}
exports.create = async (req,res)=>{
    const data = req.body;
    const file = req.file;
    // console.log(file);
    if(file){
        const img = fs.readFileSync(file.path);
        data.thumbnail = {
            contentType: file.mimetype,
            data:img.toString("base64")
        }
    }
    try {
        // data.thumbnail = `/uploads/${file.filename}`;
        const p = new Product(data);
        await p.save();
        res.redirect("/product");
    } catch (error) {
        res.render("product/form",{product:data,error:error});
    }
}

exports.formEdit = async (req,res)=>{
    const _id = req.params.id;
    try {
        const product = await Product.findById(_id);
        product.url = req._parsedOriginalUrl.path;
        res.render("product/form",{product:product});
    } catch (error) {
        res.redirect("/product");
    }
    
}

exports.update = async (req,res)=>{
    const _id = req.params.id;
    const data= req.body;
    const product = await Product.findById(_id);
    try {
        const file = req.file;
        if(file){
            const img = fs.readFileSync(file.path);
            data.thumbnail = {
                contentType: file.mimetype,
                data:img.toString("base64")
            }
        }else{
            data.thumbnail = product.thumbnail;
        }
        await Product.findByIdAndUpdate(_id,data);
        res.redirect("/product");
    } catch (error) {
        res.render("product/form",{product:product});
    }
}

exports.delete =  async (req,res)=>{
    const _id = req.params.id;
    try {
        await Product.findByIdAndDelete(_id);
        res.redirect("/product");
    } catch (error) {
        res.redirect("/product");
    }
}