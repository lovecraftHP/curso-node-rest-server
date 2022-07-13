const { Router } = require("express");
const { check, body } = require("express-validator");
const AuthController = require("../controller/auth.controller");
const { validarCampos } = require("../middlewares");

const router = Router();
const controller = new AuthController();

router.post(
  "/login",
  check("email", "El correo es obligatorio").not().isEmpty().isEmail(),
  check("password", "La password es obligatoria").not().isEmpty(),
  validarCampos,
  controller.getAuth
);

module.exports = router;
