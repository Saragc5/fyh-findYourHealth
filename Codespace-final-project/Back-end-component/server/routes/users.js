const ramda = require("ramda");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const express = require("express");
const router = express.Router();
const upload = require("../libs/storage");
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;
// 
const jwtSecret = process.env.SEED;
const User = require("../models/user");
const {verifyToken} = require("../middlewares/auth");

let corsOptions = {
    origin : ['http://localhost:3000'],
  }

//Endpoint for getting the list of users:
router.get("/", cors(corsOptions), async (req, res)  => {  
   //For this endpoint, log in is needed 
    const PAGE_SIZE = 100;
    const page = req.query.page || 1;

    const count = await User.countDocuments();
    
    User.find({active: true, categoryprof: true})
    .skip(( page - 1) * PAGE_SIZE) 
    .limit(PAGE_SIZE) 
    .exec((error, users) => {
        if(error) {
            res.status(400).json({ok: false, error});
        } else {
            res.status(200).json({message: "Here is the list of professionals",
             ok: true, page, pageSize: PAGE_SIZE, count, results: users,
             headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT, DELETE",
                "Access-Control-Allow-Credentials": "true"
            }
            });
        }
    })
});
//Endpoint for getting the info of one professional: 
router.get("/:id",  cors(corsOptions), async (req, res) => {
   //For this endpoint, log in is needed    
    const id = req.params.id;  
    const body = ramda.pick (["id", "image", "role", 
    "firstName","lastName",
    "profession", "speciality", 
    "username", "email", "active"], req.body)
   
    User.findById(
        id,        
        body,
        {categoryprof: true, active: true } , // options: only professionals users are shown  
        (error, user) => {
            if(error) {
                res.status(400).json({ok: false, error: "not a professional"});
  
            } else if (!user){
                res.status(400).json({ok: false, error: "User not found"});
                
            } else {
                res.status(200).json({ message: "Aquí está el profesional que busco", ok: true, user});
               
            }
        }
    );
   
  });

//Endpoint for getting the personal info from a user throw the token (used in profile form and auth) 
router.get( "/getuser/:id", verifyToken,  cors(corsOptions), async (req, res) => {
    const id = req.params.id; 
    const body = ramda.pick(["username", "firstname", 
    "lastname","email", "password", "dateOfBirth", "city", 
    "fullAddress", 
    "phoneNumber", "website", 
    "companyName", 
    "profession", "speciality", "experience", "description"],
     req.body);
    await User.findById(
    id,    
    body,      
    {runValidators: true, context: 'query', upsert: true,  returnDocument: 'after', active: true },
    (error, userDB) => {
        if(error) {
            res.status(500).json({ok: false, error});
        } 
        else if(!userDB ) {
            res.status(400).json({
                ok: false,
                error: {message: "User not found"}
            });
        }
        else {           
            res.status(200).json({ok: true, id, userDB, message: "Aquí está los datos de user, de la ruta /getuser/:id",
                userDB,
                headers: {
                    "Access-Control-Allow-Headers" : "Authorization, Origin, X-Requested-With, Content-Type, Accept", 
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "GET , POST, OPTIONS",
                    "Access-Control-Allow-Credentials": "true",
                    "Accept": "cors",
                    "Accept": "application/json",

                }
            });            
        }
    })    
})
//Endpoint for first registration of a user: 
router.post("/register", cors(corsOptions), async (req, res) => {
    let body = req.body;

    const user = new User({       
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,        
        email: body.email,        
        password: bcrypt.hashSync(body.password, 10),
        categoryprof: body.categoryprof, 
        image: body.image,
        fullAddress: body.fullAddress,
        dateOfBirth: body.datOfBirth,
        city: body.city,
        website: body.website,
        companyName: body.companyName,
        profession: body.profession,
        speciality: body.speciality,
        experience: body.experience,
        description: body.description   
        //hashSync is to be async the encriptation of the password
       });   
    user.save((error, savedUser) => {
        if(error) {
            res.status(400).json({ok: false, error});
        } else {
            res.status(201).json({ok: true, savedUser,
                message: "Ok usuario recibido en bbdd",
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "http://localhost:3000/register",
                    "Access-Control-Allow-Methods": "POST",
                    "Accept": "cors",
                }});
        }
    });
});
//Endpoint for modifiying user details in profiles:
router.patch("/profile/categoryprof/:id", cors(corsOptions), async (req, res) => {
    const id = req.params.id;

    const body = ramda.pick(["username", "firstname", 
    "lastname","email", "password", "dateOfBirth", "city", 
    "fullAddress", 
    "phoneNumber", "website", "image",
    "companyName", 
    "profession", "speciality", "experience", "description"],
     req.body);  
    
    User.findByIdAndUpdate(
        id,        
       body, //update      
        { new: true, runValidators: true, context: 'query', upsert: true,  returnDocument: 'after' }, // options       
        (error, updatedUser) => {
            if(error) {
                res.status(400).json({ok: false, error});
            } else {
                res.status(200).json({ok: true, id, updatedUser,
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Access-Control-Allow-Methods": "PATCH, OPTIONS",
                        "Accept": "cors",
                        "Access-Control-Allow-Headers" : "Authorization, Origin, X-Requested-With, Content-Type", 
                        "Access-Control-Allow-Credentials": "true",
                        "Accept": "application/json",                   

                    }
                });
            }
        }
    );
  
    
});
//Endoint for modifiying the password once we are logued in:
router.post("/api/modifyPassword", verifyToken, cors(corsOptions),  async (req, res) => {
    const id = req.user._id;//this comes from the verifyToken, created req.user to keep the id   
    const user = await User.findById(id);

    if(!user){
        return res.status(404).json("User not found")
    }   
    const body = {
        password: user.password
    };   
    
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
  

    //Logic to verify that the oldPassword is correct before continue with hash the newPassword:
    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) {
        return res.status(401).json({ ok: false, error:" Password is not correct" });
    }
    //Logic for ahsh the new password:  
  const hashedPassword = bcrypt.hashSync(newPassword, 10); 
  user.password = hashedPassword;
   
    
    User.findByIdAndUpdate(
        id,      
       { password: hashedPassword},//update
       { new: true },
       (error, updatedUser) => {
       
        if(error) {
            res.status(401).json({ok: false, message: "Wrong details"});
        } else {
            res.status(200).json({ok: true, id, message: "Ok, password updated", 
            updatedUser,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "PATCH, PUT, POST, OPTIONS",
                    "Access-Control-Allow-Headers" : "Authorization, Origin, X-Requested-With, Content-Type", 
                    "Access-Control-Allow-Credentials": "true",
                    "Accept": "application/json",     
                    "Accept": "cors",              
      
                }});
        }
      })

})
//Endpoint for uploading an image to the user profile after loggued in:
router.post("/profile/uploadimage/:id", upload.single("image"),cors(corsOptions), async (req, res) => {
    let idUser = req.params.id; 
    let body = req.body;

    if (req.file) {
        const { filename } = req.file
        //Use the object user to update the DB:
        let user = ({
            image: filename,
        });

        //Use uploadImage for uploading the image with setImage
        let uploadImage = new User({
            image: filename,
        })
        uploadImage.setImage(filename)

        User.findByIdAndUpdate(  idUser, user, { new: true }, (err, user) => {
            if(err) {
                res.status(400).json({ok: false, err});
            } else {
                res.status(200).json({ok: true, user,
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Access-Control-Allow-Methods": "POST, OPTIONS",
                        "Access-Control-Allow-Headers" : "Authorization, Origin, X-Requested-With, Content-Type, Accept", 
                        "Access-Control-Allow-Credentials": "true",
                        "Accept": "application/json", 
                        }
                });
            }
        });
    }    
});
//Endpoint for deleting the user profile, him/herself after loggued in: 
router.delete("/profile/categoryprof/:id", cors(corsOptions), async (req, res) => {
    const id = req.params.id;

    User.findByIdAndUpdate(
        id,
        {active: false},//with this, the users is not shown
        //we avoid to delete some information that will be needed in the future        
        { new: true, runValidators: true, context: 'query' }, // options
        (error, updatedUser) => {
            if(error) {
                res.status(400).json({ok: false, error});

            } else if (!updatedUser){
                res.status(400).json({ok: false, error: "User not found"});
                
            } else {
                res.status(200).json({ok: true, updatedUser});
            }
        }
    );
});

module.exports = router;