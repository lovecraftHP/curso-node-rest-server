const bcrypt = require("bcrypt");
const { request, response } = require("express");
const User = require("../models/usuario");

class UserController {
  userGet = (req, res = response) => {
    res.json({
      msg: "User get - controlador",
    });
  };

  userGetDetails = (req = request, res = response) => {
    res.json({
      msg: `Datos por get ->${req.params.id} `,
    });
  };
  /* A function that is using the async/await syntax to get the data from the database. */
  userGetDetailsQuery = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;

    //? limit es para paginar
    //? con skip empezara desde el numero que se le indique

    //! obviamente hacer las cosas asi es una mala practica
    // const usuarios = await User.find({state:true}).limit(limite).skip(desde);
    // const total = await User.countDocuments({state:true})

    //* por eso es mejor utilizar esta promesa y lanzarlas al tiempo
    const [total, usuarios] = await Promise.all([
      User.countDocuments({ state: true }),
      User.find({ state: true }).limit(limite).skip(desde),
    ]);
    res.json({
      msg: "Datos de get por query",
      total,
      usuarios,
    });
    // if(Object.keys(data).length==0){
    //     res.json({
    //         msg:'Datos de get por query',
    //         usuarios
    //     })
    // }else{
    //     res.json({
    //         msg:'Datos de get por query',
    //        data
    //     })
    // }
  };

  /**
   * It takes a request and a response object, and then it creates a new user object with the data from
   * the request body, and then it saves that user object to the database.
   * @param [req] - The request object.
   * @param [res] - The response object.
   */
  userPost = async (req = request, res = response) => {
    //esto es solo para asegurarse de que no se modifiquen ciertos datos

    const { name, email, password, rol } = req.body;
    const usuario = new User({ name, email, password, rol });

    //* encriptar passwd
    const salt = bcrypt.genSaltSync(); //generado los saltos
    usuario.password = bcrypt.hashSync(password, salt); //generado el hash de una sola via
    //* guardar db
    await usuario.save();
    res.status(201).json({
      msg: "peticion por post",
      usuario,
    });
    // try {

    // } catch (error) {
    //     console.log(error)
    //     throw new Error('Error al crear el usuario')
    // }
  };

  userPut = async (req = request, res = response) => {
    const { id } = req.params; //* el id es por url
    //? el _id solo por si acaso
    const { _id, password, email, google, ...resto } = req.body;

    //Validar contra DB

    if (password) {
      const salt = bcrypt.genSaltSync(); //generado los saltos
      resto.password = bcrypt.hashSync(password, salt); //generado el hash de una sola via
    }
    const usuario = await User.findByIdAndUpdate(id, resto);
    res.status(201).json({
      msg: "peticion por put",
      usuario,
    });
  };
  userDelete = async (req = request, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    //* la cuestion es que asi lo borramos y no sabriamos quien se fue
    //* osea que usuario se elimino
    //const { name } = await User.findOneAndRemove(id);

    //? de esta forma es mucho mejor, usando el estado
    const { name } = await User.findByIdAndUpdate(id, { state: false });
    //!esto no se puede hacer ya que causa dependencias circulares
    //const usuarioAuth = req.usuario;
    res.json({
      msg: `Se borro el usuario ${name}`,
      //usuarioAuth,
    });
  };
}

module.exports = UserController;
