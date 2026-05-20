import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { PacienteEspecialistaController } from "../controllers/PacienteEspecialistaController";


export const router = Router()

router.post('/:IdPaciente',
    body('IdEspecialista').notEmpty().withMessage('El Id del especialista es obligatorio'),
    handleInputErrors,
    PacienteEspecialistaController.crearPacienteEspecialista
)

export default router