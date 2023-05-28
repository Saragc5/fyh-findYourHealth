const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let contactFormSchema = new Schema({
    name: {
        type: String,
        required:  [true]
    },    
    email: {
        type: String,
        required: [true]
    },
    topic: {
        type: String,
        required: [true]
    },
    enquiry: {
        type: String,
        required: [true]
    },
    dateOfSent:{
        type: String,
        default: Date,
        required: [true]
    }
});

contactFormSchema.plugin(uniqueValidator, {message: "{PATH} should be unique"});

module.exports = mongoose.model("ContactForm", contactFormSchema);