const express = require("express");
const app = express();

//All my routes:
app.use("/users", require("./users"));
app.use("/login", require("./login"));
app.use("/blog", require("./blog"));
app.use("/contact", require("./contact"));


module.exports = app;