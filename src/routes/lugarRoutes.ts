import { Router } from "express";
import { LugarController } from "../controllers/LugarController"; 
import { body, param } from "express-validator"; 
import { handleInputErrors } from "../middleware/validation"; 
import { PatientController } from "../controllers/PacienteController"; 
import { validacionLugar } from "../middleware/lugarAtencion"; 
import { authenticate } from "../middleware/Auth";

const router = Router()

router.use(authenticate)

router.post('/' , 
    body('nombre') .notEmpty().withMessage('El nombre es obligatorio'), 
    handleInputErrors, 
    LugarController.crearLugares 
) 

router.get('/' ,LugarController.obtenerLugares) 
router.get('/:lugarId' , 
    param('lugarId') .isInt().withMessage('El id no es valido'), 
handleInputErrors, 
LugarController.obtenerLugaresPorId 
)

router.param('lugarId', validacionLugar)

router.put('/:lugarId', 
    param('lugarId').isInt().withMessage('El id no es valido'), 
    body('nombre') .notEmpty().withMessage('El nombre es obligatorio'), 
    handleInputErrors, 
    LugarController.editarLugares 
)

router.delete('/:lugarId', 
    param('lugarId') .isInt().withMessage('El id no es valido'), 
    handleInputErrors, 
    LugarController.eliminarLugares 
) 

/** Pacientes */ 
router.get('/:lugarId/pacientes', LugarController.obtenerPacientesPorLugar) 

router.post('/:lugarId/pacientes', 
    body('nombre').notEmpty().withMessage('El nombre del paciente es obligatorio'), 
    body('apellido').notEmpty().withMessage('El apellido del paciente es obligatorio'), 
    body('dni').notEmpty().withMessage('El dni del paciente es obligatorio'),
    body('lugar_id').notEmpty().withMessage('El lugar de atencion es obligatorio'),
    handleInputErrors, 
    LugarController.createPatient 
)

export default router