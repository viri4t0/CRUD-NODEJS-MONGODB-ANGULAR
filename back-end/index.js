'use strict'
/**
 * Archivo principal
 */

//Cargamos Express
var app = require('./app');
const port = 3000;

//Cargamos moongose
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/api_rest_crud';

//Habilitar promesas
mongoose.Promise = global.Promise;

//Desactivar metodos antiguos
mongoose.set('useFindAndModify', false);

//Conectamos con la base de datos
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(() =>
{
    console.log("conexion a la base de datos realizada");
})
.catch(()=>
{console.log("Fallo de conexion a mongodb")}); 


//Lanzamos el servidor
app.listen(port, () => {
    console.log('Servidor express corriendo')
  })