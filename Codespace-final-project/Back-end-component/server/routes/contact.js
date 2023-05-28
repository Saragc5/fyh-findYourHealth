const ramda = require("ramda");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

const ContactForm = require("../models/contactForm");

//Endpoint for receiving the enquiries from the people who want to ask something in Contact form:
router.post("/",    (req, res) => {
  
  let body = req.body;

  const contactForm = new ContactForm({
    name: body.name,
    email: body.email,
    topic: body.topic,
    enquiry: body.enquiry,
    dateOfSent: body.dateOfSent
  });

  contactForm.save((error, savedcontactEnquiry) => {
    if (error) {
      res.status(400).json({ ok: false, error });
    } else {
      res.status(201).json({ ok: true, savedcontactEnquiry });
    }
  });

});

module.exports = router;