import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { EspecialistaController } from "../controllers/EspecialistaController";


const router = Router()

router.post('/',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('IdTipoEspecialidad').notEmpty().withMessage('El tipo de especialidad es obligatorio'),
    handleInputErrors,
    EspecialistaController.crearEspecialista
)

router.get('/', handleInputErrors, EspecialistaController.obtenerEspecialistas)

router.put('/:id',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('IdTipoEspecialidad').notEmpty().withMessage('El tipo de especialidad es obligatorio'),
    handleInputErrors,
    EspecialistaController.editarEspecialista
)
export default router