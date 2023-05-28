require("../config/config");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

let corsOptions = {
    origin: ['http://localhost:3000'],
}

//Endpoint for log in , user registered: 
router.post("/", cors(corsOptions), (req, res) => {
    const body = req.body;
   

    User.findOne({ email: body.email }, (error, userDB) => {
        if (error) {
            res.status(500).json({ ok: false, error });

        } else if (!userDB || userDB.active === false) {
           
            res.status(400).json({
                ok: false,
                error: { message: "Email not found" }
            });

        }
        else if (!bcrypt.compareSync(body.password, userDB.password)) {
            res.status(400).json({
                ok: false,
                error: { message: "Invalid password" }
            });
        } else {
            const token = jwt.sign(
                { user: userDB }, // payload  put in user all the info from DB
                process.env.SEED,//verify signature
                { expiresIn: 1800 }
            );

            const id = userDB._id;
            const active = userDB.active;

            res.status(200).json({
                ok: true, token, id,active,
                user: userDB, message: "User successfully logged in",
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Credentials": "true"
                }
            });
            

        }
    })
});

module.exports = router;