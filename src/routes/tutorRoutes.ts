import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TutorController } from "../controllers/TutorController";


const router = Router()

router.post('/:pacienteId/tutor', 
    body('nombre').notEmpty().withMessage('El nombre del tutor es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido del tutor es obligatorio'),
    handleInputErrors,
    TutorController.crearTutor
)

router.put('/:tutorId/tutor',
    body('nombre').optional().notEmpty().withMessage('El nombre del tutor no puede estar vacío'),
    body('apellido').optional().notEmpty().withMessage('El apellido del tutor no puede estar vacío'),
    handleInputErrors,
    TutorController.editarTutor
)


export default router