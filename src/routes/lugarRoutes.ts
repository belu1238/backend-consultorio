import { Router } from "express";
import { LugarController } from "../controllers/LugarController"; 
import { body, param } from "express-validator"; 
import { handleInputErrors } from "../middleware/validation"; 
import { accesoPaciente, validacionLugar } from "../middleware/lugarAtencion"; 
import { authenticate } from "../middleware/Auth";

const router = Router()

router.use(authenticate) // genera req.user

router.param('lugarId', validacionLugar)
router.param('pacienteId', accesoPaciente)

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


router.put('/:lugarId', 
    param('lugarId').isInt().withMessage('El id no es valido'), 
    body('nombre') .notEmpty().withMessage('El nombre es obligatorio'), 
    handleInputErrors, 
    LugarController.editarLugares 
)

export default router