const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
const { validarCampos } = require('../middlewares/validar_campos');
class Server{
    constructor(){
        this.app = express()
        this.port = process.env['PORT']
        this.userPath= '/api/users'//* esto es opcional

        //* Connectar base de datos
        this.connectDb()
        //* Middleweres
        this.middlewares()
    }

    //? de esta forma se pueden llamar varias conexiones
    async connectDb(){
        await dbConnection()
    }

    middlewares(){
        // uso de cors
        this.app.use(cors())
        // Parseo de los datos a json
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:false}))
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
       this.app.use(this.userPath,require('../routes/user.routes'))
    }
    runServer(){
        this.app.listen(this.port,()=>{
            console.log(`Pendiente al http://localhost:${this.port}`);
        })
    }
}
module.exports = Server