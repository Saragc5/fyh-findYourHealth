const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const { appConfig } = require("../config/config");

let Schema = mongoose.Schema;

const validRoles = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid role"
};

let blogSchema = new Schema({
    image: {      
      type: String,
      required: [true]
    },
    
    title:{
      type: String,
      required:  [true]

    },
    text: {
      type: String,
      required:  [false]
    },   
    author: {
      type: String,
      required: [false]
    },
    topic: {
      type: String,
      required: [false]
    },
    dateOfPublish: {
      //Date is set by default
      type: String,
      default: Date,
      required: [false]
    },
    role: {
      // Not required if omitted
      type: String,
      default: "USER",
      enum: validRoles
    },
    active: {
      type: Boolean,
      default: true
    },
});

blogSchema.plugin(uniqueValidator, {message: "{PATH} should be unique"});
blogSchema.plugin(mongoosePaginate);

blogSchema.methods.setImage = function setImage (filename) {
  const { host, port } = appConfig
  this.image = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model("BlogArticle", blogSchema);