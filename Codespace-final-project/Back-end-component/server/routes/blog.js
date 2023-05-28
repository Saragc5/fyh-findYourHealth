const ramda = require("ramda");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();
const upload = require("../libs/storage");
const cors = require("cors");

const BlogArticle = require("../models/blogArticle");

let corsOptions = {
  origin: ['http://localhost:3000'],
}

//Endpoint for get a list of all the articles published:
router.get("/", cors(corsOptions), async (req, res) => {
  //For this endpoint, log in is not needed    
  
  const PAGE_SIZE = 100;
  const page = req.query.page || 1;
  const count = await BlogArticle.countDocuments();

  BlogArticle.find({ active: true })
    .sort({ dateOfPublish: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .exec((error, blogArticles) => {
      if (error) {
        res.status(400).json({ ok: false, error });
      } else {
        res.status(200).json({
          ok: true, 
          page, 
          pageSize: PAGE_SIZE, 
          count, 
          results: blogArticles,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT, DELETE",
            "Access-Control-Allow-Credentials": "true"
          }
        });
      }
    })


});


//Endpoint for get an individual article:
router.get("/:id", cors(corsOptions), (req, res) => {
  
  const id = req.params.id;
  const body = ramda.pick(["image", "title", "text", "author", "dateOfPublish"], req.body)

  BlogArticle.findById(
    id,
    body,
    { active: true },
    // options
    (error, article) => {
      if (error) {
        res.status(400).json({ ok: false, error });

      } else if (!article) {
        res.status(400).json({ ok: false, error: "Article not found" });

      } else {
        res.status(200).json({ ok: true, article });
        
      }
    }
  );
});

//Endpoint for publishing a new article in the blog, only professionals can do it:
router.post("/newBlogArticle", cors(corsOptions), upload.single("image"), (req, res) => {
  
  const body = req.body;
  const image = req.file.filename;


  const blogArticle = new BlogArticle({
    image: image,
    title: body.title,
    text: body.text,
    topic: body.topic,
    author: body.author,
    datepublished: body.datepublished
  });

  blogArticle.save((error, savedBlogArticle) => {
   
    if (error) {
      res.status(400).json({ ok: false, error })
      res.status(204).json({ ok: false, error });
    } else {
      res.status(201).json({
        ok: true,
        message: "Ok new article received in DB", savedBlogArticle
      });
    }
  });

});


module.exports = router;