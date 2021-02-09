'use strict'
/***
 * Gestion de rutas
 */


var express = require('express');
var router = express.Router();
//Objeto json con las rutas crud-controller.js
var CrudController = require("./controladores/crud-controller");


// middleware 
router.get('/getPeliculas',CrudController.getPeliculas)
router.post('/add', CrudController.add)
router.post('/upload/:id',CrudController.upload)




module.exports = router;
