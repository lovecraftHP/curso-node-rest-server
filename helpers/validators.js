const Rol = require('../models/rol');
const User = require('../models/usuario');


/* It's a class that validates if a role exists in the database and if an email exists in the database. */
class Validators{
    esRoleValido=async(rol='')=>{
        const existeRol = await Rol.findOne({rol});
        if(!existeRol){
            throw new Error(`Error el ${rol} no esta en la DB`)
        }
    }
    esEmailRep = async (email='') =>{
        const existeEmail = await User.findOne({email})
        if(existeEmail){
            throw new Error(`Error por favor verifica el correo, es probable que exista`);
        }
    }

    existeUsuarioPorId = async (id) =>{
        const existeUsuario = await User.findById(id);
        if(!existeUsuario){
            throw new Error(`Error no se pudo encontrar un usuario con ese ID`);
        }
    }

}
module.exports = Validators