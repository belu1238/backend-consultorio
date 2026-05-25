import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { DiagnosticoController } from "../controllers/DiagnosticoController";


const router = Router()

router.post('/:IdPaciente',
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
    handleInputErrors,
    DiagnosticoController.crearDiagnosticoController
)

router.get('/:IdPaciente', handleInputErrors, DiagnosticoController.obtenerDiagnosticosController)

router.put('/:id/paciente/:IdPaciente',
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
    handleInputErrors,
    DiagnosticoController.editarDiagnosticoController
)

export default router