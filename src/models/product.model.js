const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const product_schema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 255
    },
    thumbnail: {
        data : String,
        contentType : String
    },
    price: {
        type : Number,
        min : 0,
        required : true
    },
    category: String,
    description: String 
});

module.exports = mongoose.model("Product",product_schema);