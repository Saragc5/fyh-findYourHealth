const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.get("authorization");
  token = token && token.split(" ")[1];
  
  
  const decoded = jwt.verify(token, process.env.SEED);
 // create req.user for using in modify-password endpoint
  req.user = decoded.user;
  
  jwt.verify(token, process.env.SEED, (error, payload) => {
      if (error) {
          
          res.status(401).json({
              ok: false,
              error: {message: "Invalid token, unauthorized"}
          })          
      } else {
          next();
      }
  });
};

module.exports = {verifyToken};