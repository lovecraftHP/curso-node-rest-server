const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/usuario");

const validarJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    res.status(400).json({
      msg: "No exite el token no se puede continuar",
    });
  }
  //----------------------------------------------------------------
  try {
    const { uid } = jwt.verify(token, process.env["SECRETKEY"]);
    const usuario = User.findById(uid);
    if (!usuario.state) {
      return res.status(401).json({
        msg: "Token no valido. usuario borrado",
      });
    }
    //!esto no se puede hacer ya que causa dependencias circulares
    //req.usuario = usuario;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      msg: "No exite el token",
    });
  }
};

module.exports = { validarJWT };
