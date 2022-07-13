const validaCampos = require("./validar_campos");
const validarJWT = require("./validar_jwt");

module.exports = {
  ...validaCampos,
  ...validarJWT,
};
