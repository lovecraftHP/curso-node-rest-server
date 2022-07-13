const { Router } = require("express");
const { check, body } = require("express-validator");

const UserController = require("../controller/user.controller");
const Validators = require("../helpers/validators");

const { validarCampos, validarJWT } = require("../middlewares");

const validadores = new Validators();
const controller = new UserController();

const router = Router();
router.get("/", controller.userGetDetailsQuery);
router.get("/:id", controller.userGetDetails),
  router.post(
    "/",
    check("name").not().isEmpty().withMessage("El nombre no puede ser vacio"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("El password es obligatorio y mayor de 6 caracteres"),
    check("email")
      .custom(validadores.esEmailRep)
      .isEmail()
      .withMessage("El correo no es valido"),
    // check('rol').isIn(['ADMIN_ROLE','USER_ROLE']).withMessage('No es un rol permitido')
    check("rol").custom(validadores.esRoleValido),
    validarCampos,
    controller.userPost
  );
router.put(
  "/:id",
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(validadores.existeUsuarioPorId),
  check("rol").custom(validadores.esRoleValido),
  validarCampos,
  controller.userPut
);
router.post(
  "/remove/:id",
  validarJWT,
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(validadores.existeUsuarioPorId),
  validarCampos,
  controller.userDelete
);

module.exports = router;
