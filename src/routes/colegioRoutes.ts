import { Router } from "express";
import { ColegioController } from "../controllers/ColegioController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
const router = Router()

router.get('/', ColegioController.obtenerColegioController)
router.post('/',
    body('nombre').notEmpty().withMessage('El nombre del colegio es obligatorio'),
    handleInputErrors, 
    ColegioController.crearColegioController)
router.put('/:IdColegio', 
    body('nombre').notEmpty().withMessage('El nombre del colegio es obligatorio'),
    handleInputErrors,
    ColegioController.editarColegioController)

export default router