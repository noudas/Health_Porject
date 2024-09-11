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
