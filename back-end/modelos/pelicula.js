'use strinct'
/***
 * Esquema moongose de la pelicula
 */

var moongose = require('mongoose');
var Schema = moongose.Schema;


/***
 * @titulo
 * @contenido
 * @fecha_de_estreno
 * @categoria
 * @director
 * ****@nombre
 * ****@apellido
 * @imagen
 */
var peliculaSchema = Schema(
{
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: String, required: [true,'La fecha es obligatoria']},
    category: {type: [String] , enum: {values:['accion', 'aventura', 'romance', 'terror'],message: 'La pelicula no puede ser de ese tipo.'}},
    director: 
    {
        nombre: {type: String, default:'Director desconocido'},
        apellidos: {type: String, default: null},
    },
    image: {type:String, default: null}
});

// Si no existe, los rellenamos por defecto, pero solo los que no nos deja con default
peliculaSchema.pre("save",function(next) {
    if(!this.category)
        this.category = [];
    if(!this.director.nombre && !this.director.apellidos)
    {
        this.director.nombre = "Director desconocido";
        this.director.apellidos = '';
    }
    if(!this.image)
        this.image = null;

  
    next();
  });

module.exports = moongose.model('Pelicula',peliculaSchema);