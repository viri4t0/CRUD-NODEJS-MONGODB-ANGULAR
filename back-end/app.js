'use strict'
/**
 * Configuracion del servidor
 */

const express = require('express');
const rutas = require('./router');
const bodyParser  = require("body-parser");
const app = express();




//Midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', rutas);

module.exports = app;
