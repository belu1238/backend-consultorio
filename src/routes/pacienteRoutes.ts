import { Router } from "express";
import { body, param } from "express-validator"; 
import { handleInputErrors } from "../middleware/validation"; 
import { PatientController } from "../controllers/PatientController"; 
import { validacionLugar } from "../middleware/lugarAtencion"; 
import { SesionController } from "../controllers/SesionController";

const router = Router()

router.get('/dashboard', 
    handleInputErrors,
    SesionController.obtenerResumenSesiones
)

router.post('/', 
    body('nombre').notEmpty().withMessage('El nombre del paciente es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido del paciente es obligatorio'),
    body('dni').notEmpty().withMessage('El dni del paciente es obligatorio'),
    body('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento del paciente es obligatorio'),
    handleInputErrors,
    PatientController.crearPaciente
)

router.get('/', PatientController.obtenerPacientes)

router.get('/:pacienteId',
    param('pacienteId').isInt(),
    handleInputErrors,
    PatientController.obtenerPacientePorId
);

router.put('/:pacienteId', 
    param('pacienteId').isInt().withMessage('El id del paciente no es valido'),
    body('nombre').notEmpty().withMessage('El nombre del paciente es obligatorio'), 
    body('apellido').notEmpty().withMessage('El apellido del paciente es obligatorio'), 
    body('edad').notEmpty().withMessage('La edad del paciente es obligatorio'), 
    handleInputErrors, 
    PatientController.editarPaciente
)

router.delete('/:pacienteId',
    param('pacienteId').isInt().withMessage('El id del paciente no es valido'),
    handleInputErrors,
    PatientController.eliminarPaciente
);


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