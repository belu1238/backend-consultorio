import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ArchivoDiagnosticoController } from "../controllers/ArchivoDiagnosticoController";


const router = Router()

router.post('/:diagnosticoId', 
    body('nombre').notEmpty().withMessage('El nombre del archivo es obligatorio'),
    body('url').notEmpty().withMessage('La URL del archivo es obligatoria'),
    body('fechaSubida').notEmpty().withMessage('La fecha de subida es obligatoria'),
    handleInputErrors,
    ArchivoDiagnosticoController.crearArchivoDiagnostico
)

router.get('/:diagnosticoId', handleInputErrors, ArchivoDiagnosticoController.obtenerArchivosDiagnostico)

router.put('/:id/diagnostico/:diagnosticoId',
    body('nombre').optional().notEmpty().withMessage('El nombre del archivo no puede estar vacío'),
    body('url').notEmpty().withMessage('La URL del archivo es obligatoria'),
    body('fechaSubida').notEmpty().withMessage('La fecha de subida es obligatoria'),
    handleInputErrors,
    ArchivoDiagnosticoController.editarArchivoDiagnostico
)

export default router