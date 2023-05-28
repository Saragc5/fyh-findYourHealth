const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate-v2");
const { appConfig } = require("../config/config");

let Schema = mongoose.Schema;

const validRoles = {
    values: ["ADMIN", "USER"],
    message: "{VALUE} is not a valid role"
};

let userSchema = new Schema({
    image: {
        type: String,
        required: [false] 
    },
    categoryprof: {
        type: Boolean,
        required: [true] 
    },
    username : {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    firstname: {
        type: String,
        required:  [false]
    },
    lastname: {
        type: String,
        required:  [false]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"] 
    },
    phoneNumber: {
        type: Number,
        required: [false]
    },
    dateOfBirth: {
        type: String,
        required: [false] 
    },
    fullAddress: {
        type: String,
        required: [false]    
    },
    city: {
        type: String,
        required: [false]    
    },
    website: {
        type: String,
        required: [false]
    },
    companyName: {
        type: String,
        required: [false]
    },
    profession: {
        type: String,
        required: [false]
    },
    speciality: {
        type: String,
        required: [false]
    },
    experience: {
        type: Number,
        required: [false]
    },
    description: {
        type: String,
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
    }
});



userSchema.methods.toJSON = function() {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
}

userSchema.plugin(uniqueValidator, {message: "{PATH} should be unique"});
userSchema.plugin(mongoosePaginate);

userSchema.methods.setImage = function setImage (filename) {
  const { host, port } = appConfig 
  this.image = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model("User", userSchema);