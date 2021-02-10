'use strict'
/**
 * Rutas de los diferentes metodos
 */

//Importamos el modelo de la Pelicula de mongo para realizar las consultas
var Pelicula = require("../modelos/pelicula");
//importamos fs que nos permite eliminar y crear archivos ( para subir imagenes)
const fs = require('fs'); 
//Nos permite trabajar con el pad
const path = require('path') 
//Nos permide la subida de archivos 
const formidable = require('formidable'); 


//Objeto json con las diferentes rutas y metodos
var controller = 
{

    /** OBTENEMOS ARRAY DE PELICULAS
     *  
     * @param {*} res 
     */
    getPeliculas: (req,res) =>
    {
        //Consulta a realizar
        var query = Pelicula.find({});

        //Ejecucion de la consulta y obtencion de parametros
        query.exec((err,peliculas) =>
        {
            if(!peliculas || err)
            {
                return res.status(400).send(
                {
                    status: 'error',
                    message: 'No hay peliculas o se produjo un error'
                });
            }
            else
            {
                return res.status(200).send(
                {
                    status: 'success',
                    peliculas: peliculas   
                });
            }
        });
    },

    /**GUARDAR PELICULA EN LA BD
     * 
     * 
     * @param {*} req Pasamos los parametros de la pelicula
     * @param {*} res Devolvemos si la pelicula se ha guardado en la BD
     */
    add: (req,res) =>
    {
        console.log(req.body)
        var params = req.body

        //Si no dispone de titulo, descripcion o fecha se descarta
        if(!params.title || !params.content || !params.date)
        {
            res.status(400).send({status: 'error',message:'faltan datos'})
        }
        else
        {
            //Cargamos el objeto definido en moongo
            var pelicula = new Pelicula();

            //rellenamos el objeto con los datos recibidos
            pelicula.title = params.title;
            pelicula.content = params.content;
            pelicula.date = params.date;
            pelicula.category = params.category;
            pelicula.director = params.director;
            pelicula.image = params.image;

            pelicula.save((err,fileStored) =>
            {
                if(!err && fileStored)
                    res.status(200).send(
                    {
                        status: 'success',
                        pelicula: fileStored
                    })
                else
                {
                    res.status(400).send(
                    {
                        status: 'error',
                        message: err
                    })
                }
            });
        }
    },

    /** SUBIDA DE IMAGENES CON FORMIDABLE 
     *
     * @param {*} req Pasamos la imagen y el id de la pelicula al que pertenece
     * @param {*} res Devolvemos si la iamgen se ha guardado
     * 
     * pasos:
     * 
     * 1: se recoge el fichero y se divide en extension y nombre
     * 2: se obtiene el id de la pelicula a subir la imagen 
     * 3: se sube la imagen y se borra el temporal
     */
    upload: (req, res, next) => { 
    
        const form = new formidable.IncomingForm(); 
        form.parse(req, function(err, fields, files){ 
      
            //Cojemos el path generado temporal
            var oldPath = files.file0.path; 
            //Cojemos el nombre temporal
            var name = oldPath.split('\\').pop();
            //Cojemos la extension
            var extension = files.file0.name.split('\.')[1];
            var newName = name + '.' + extension;

            //Path donde se guardara el nuevo fichero con el nuevo nombre
            var newPath = path.join('.\\', 'uploads\\peliculas') + '\\'+ newName;
            var rawData = fs.readFileSync(oldPath) 

            //Si no es una extension valida se descarta
            if(extension != 'png' && extension != 'jpg' && extension != 'gif') 
            {
                detruirTemp(oldPath);
            }
            //Subimos el archivo
            else
            {
                var peliculaId = req.params.id;

                if(peliculaId)
                {
                    Pelicula.findOneAndUpdate({_id: peliculaId} , {image: newName},  {new:true},(err, peliculaUpdated) => 
                    {
                        if(err || !peliculaUpdated)
                        {
                            detruirTemp(oldPath);
                        }
                        else
                        {
                            fs.writeFile(newPath, rawData, function(err)
                            { 
                                if(err)
                                {
                                    detruirTemp(oldPath);
                                }
                                else
                                {
                                    fs.unlinkSync(oldPath);
                                    return res.status(200).send
                                    ({
                                        status: 'success',
                                        pelicula: peliculaUpdated
                                    }); 
                                }
                            })    
                        }
                    });
                }
            }

            /***
             * Destruimos el archivo en temp y emviamos mensaje de error
             */
            function detruirTemp(oldPath)
            {
                fs.unlink(oldPath, (err) =>
                        {
                            return res.status(400).send(
                            {
                                status: 'error',
                                message: 'Error al subir la imagen'
                            });
                        });
            } 
      }) 
    },

    getImage: (req, res) => 
    {
        var file = req.params.image;
        var path_file = './uploads/peliculas/' + file;
        fs.stat(path_file, (err,exists) => 
        {
            if(exists && !err)
            {
                return res.sendFile(path.resolve(path_file));
            }
            else
            {
                return res.status(400).send
                ({
                    status: 'error',
                    message: 'error la imagen no existe',
                });
            }
        });
    },

    delete: (req,res) =>
    {
        var peliculaId = req.params.id;

        Pelicula.findOneAndDelete({_id: peliculaId}, (err, peliculaRemoved) =>
        {

            if(!peliculaRemoved || err)
            {
                return res.status(400).send
                ({
                    status: 'error',
                    message: 'No se ha borrado la pelicula, posiblemente no existe'
                });
            }

            return res.status(200).send
            ({
                status: 'success',
                article: peliculaRemoved
            });


        });
    }

}



module.exports = controller;