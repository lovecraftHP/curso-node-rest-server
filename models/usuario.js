const {Schema, model} = require('mongoose')

const usuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio y unico'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img:{
        type:String
    },
    rol:{
        type: String,
        requried: true,
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

//?en esta parte debe ser una funcion normal
//? porque luego se requiere usar el this
/* This is a method that is being added to the schema. It is being used to remove the password and
version from the object that is returned. */
usuarioSchema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject();
    return user;
    /**
     * * de esta forma sobreescribiendo este metodo
     * * especifico que quiero devolver
     * * claramente la pass y la version no
     */
}

module.exports = model('User',usuarioSchema)