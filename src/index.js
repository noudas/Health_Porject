// Imports
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

const cors = require("cors");


// MongoDB
const Paciente = require('./mongodb/models/paciente');

const {isEmpty} = require('./utils/objUtils');

const mongodbConnect = require('./mongodb/mongodb-client')
mongodbConnect();

// Initializador
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use("/healthcheck", async (req,res) =>{
    console.log("It just works")
    res.status(200).json({ message: "ok"})
});

// CRUD para Paciente

module.exports = app;
