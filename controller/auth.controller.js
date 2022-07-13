const { request, response } = require("express");
const bcrypt = require("bcrypt");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt_generator");

class AuthController {
  getAuth = async (req = request, res = response) => {
    const { email, password } = req.body;
    //? si llamo 2 res.json con return me dara error
    try {
      //Verificar usuario
      const user = await Usuario.findOne({ email });
      if (!user) {
        return res.status(400).json({
          msg: "Email o Password incorrecto, por favor verifica. - email",
        }); //*borrar ese email cuando se suba a heroku
      }
      // Verificar si esta activo
      if (!user.state) {
        return res.status(400).json({
          msg: "Usuario no esta activo",
        });
      }
      //Verificar contra
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          msg: "Email o Password incorrecto, por favor verifica. - password",
        });
      }
      //Generar JWT
      const token = await generarJWT(user.id);
      res.json({
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "algo salio mal",
      });
    }
  };
}

module.exports = AuthController;
