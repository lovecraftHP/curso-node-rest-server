//* esto no se puede hacer debido a que se deberia de acceder a req.usuario
//* pero eso provoca error
const { response } = require("express");

const validarRol = (req, res = response, next) => {
  next();
};

module.exports = { validarRol };
