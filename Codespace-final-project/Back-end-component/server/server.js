const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { appConfig } = require("./config/config");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));//para el tema de la contraseña
app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SEED}));
app.use(cors())

let corsOptions = {
  origin : ['http://localhost:3000'],
}
app.use(cors(corsOptions));
//

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Met");
    res.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    next();
  });

  //Here are my endpoints:
app.use(require("./routes"));

//This for the imgs storage:
app.use("/public", express.static(`${__dirname}/storage/imgs`))

mongoose.connect("mongodb://localhost:27017/fyh", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", err => console.log("Connection to DB failed: ", err));
db.once("open", () => console.log("Connected to DB successfuly"));


app.listen(
  appConfig.port,
    () => console.log("Listening on port ", `${appConfig.port}`
    ));
    