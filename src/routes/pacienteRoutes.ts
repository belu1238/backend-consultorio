import { Router } from "express";
import { body, param } from "express-validator"; 
import { handleInputErrors } from "../middleware/validation"; 
import { PatientController } from "../controllers/PacienteController"; 
import { SesionController } from "../controllers/SesionController";
import { authenticate } from "../middleware/Auth";
import { authorizeRole } from "../middleware/Role";

const router = Router()

router.use(authenticate) // Todas las rutas de pacientes requieren autenticación
router.use(authorizeRole('1')) // Solo los usuarios con rol 'admin' pueden acceder a las rutas de pacientes
router.get('/dashboard', 
    handleInputErrors,
    SesionController.obtenerResumenSesiones
)

router.post('/:lugarId/pacientes', 
    body('nombre').notEmpty().withMessage('El nombre del paciente es obligatorio'), 
    body('apellido').notEmpty().withMessage('El apellido del paciente es obligatorio'), 
    body('dni').notEmpty().withMessage('El dni del paciente es obligatorio'),
    handleInputErrors, 
    PatientController.crearPaciente
)

router.get('/:lugarId/pacientes', PatientController.obtenerPacientesPorLugar) 

router.get('/:lugarId/pacientes/:pacienteId', PatientController.obtenerPacientePorId)

router.put('/:lugarId/pacientes/:pacienteId', 
    param('pacienteId').isInt().withMessage('El id del paciente no es valido'),
    body('nombre').notEmpty().withMessage('El nombre del paciente es obligatorio'), 
    body('apellido').notEmpty().withMessage('El apellido del paciente es obligatorio'), 
    handleInputErrors, 
    PatientController.editarPaciente
)


/** SESIONES */
router.post('/sesiones', 
    body('fecha').notEmpty().withMessage('La fecha de la sesión es requerida'),
    body('observaciones').notEmpty().withMessage('La observación del paciente es obligatoria'),
    handleInputErrors,
    SesionController.crearSesion
)

router.post('/:pacienteId/sesiones', 
    param('pacienteId').isInt().withMessage('El id del paciente no es valido'),
    body('fecha').notEmpty().withMessage('La fecha de la sesión es requerida'),
    body('observaciones').notEmpty().withMessage('La observación del paciente es obligatoria'),
    handleInputErrors,
    SesionController.crearSesionPorPaciente
)

router.get('/:pacienteId/sesiones',
    param('pacienteId').isInt().withMessage('El id del paciente no es valido'),
    handleInputErrors,
    SesionController.obtenerSesionesPorPaciente
)

router.get('/sesiones/fecha',
    handleInputErrors,
    SesionController.obtenerSesionesPorFecha
)

router.put('/:pacienteId/sesiones/:sesionId',
    param('sesionId').isInt().withMessage('El id de la sesión no es valido'),
    param('pacienteId').isInt().withMessage('El id del paciente no es valido'),
    body('fecha').notEmpty().withMessage('La fecha de la sesión es requerida'),
    body('observaciones').notEmpty().withMessage('La observación del paciente es obligatoria'),
    handleInputErrors,
    SesionController.editarSesion
)

export default router