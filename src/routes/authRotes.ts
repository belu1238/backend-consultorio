import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { UsuarioController } from "../controllers/UsuarioController";
import { authenticate } from "../middleware/Auth";

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
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){  // value es lo que ingresa el usuario y req se puede utilizar para comparar con otros campos
            throw new Error('Las contraseñas no coinciden')
        }
        return true 
    }),    
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

router.post('/confirm-account',
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Token no válido'),
    handleInputErrors,    
    UsuarioController.confirmarCuenta
)

router.post('/request-code',
    body('email')
        .isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    UsuarioController.confirmacionRegistro
)

router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    UsuarioController.recuperarContraseña
)

router.post('/validate-token',
    body('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Token no válido'),
    handleInputErrors,
    UsuarioController.validarToken
)

router.post('/reset-password/:token',
    param('token')
        .notEmpty()
        .isLength({min: 6, max: 6})
        .withMessage('Token no válido'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    UsuarioController.resetearContraseña
)

router.get('/user', 
    authenticate,
    UsuarioController.usuario)

router.post('/update-password',
    authenticate,
    body('actualPassword')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    body('password')
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    UsuarioController.actualizarContraseña
)
export default router