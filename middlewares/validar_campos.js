const { validationResult } = require("express-validator");

/**
 * It checks if the request body has any errors, if it does, it returns a 400 status code and the
 * errors. If it doesn't, it moves on to the next middleware
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The errors object is being returned.
 */
const validarCampos = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.errors.length !== 0){
        return res.status(400).json({errors});
    }
    next()
}

module.exports={validarCampos}