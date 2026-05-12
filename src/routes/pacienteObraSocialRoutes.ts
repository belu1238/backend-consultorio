import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { PacienteObraSocialController } from "../controllers/PacienteObraSocialController";

const router = Router()

router.post('/:pacienteId/obra-social',
    body('IdObraSocial').optional().notEmpty().withMessage('Obra social es un campo obligatorio'),
    body('numeroAfiliado').notEmpty().withMessage('El número de afiliado es un campo obligatorio'),
    body('fechaAlta').notEmpty().withMessage('La fecha de alta es un campo obligatorio'),
    handleInputErrors,
    PacienteObraSocialController.crearPacienteObraSocial
)

router.put('/:pacienteId/obra-social/:id',
    body('IdObraSocial').optional().notEmpty().withMessage('Obra social es un campo obligatorio'),
    body('numeroAfiliado').optional().notEmpty().withMessage('El número de afiliado es un campo obligatorio'),
    body('fechaAlta').optional().notEmpty().withMessage('La fecha de alta es un campo obligatorio'),
    handleInputErrors,
    PacienteObraSocialController.editarPacienteObraSocial
)

export default router