import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router()

router.post('/register',
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido')
        .notEmpty().withMessage('El apellido es obligatorio'),
    body('email')
        .isEmail().withMessage('El email no es válido'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    UsuarioController.registrarUsuario
) 

router.post('/login',
    body('email')
        .isEmail().withMessage('El email no es válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    UsuarioController.loginUsuario
)
export default router