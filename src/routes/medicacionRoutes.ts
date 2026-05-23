import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { MedicacionController } from "../controllers/MedicacionController";


const router = Router()

router.post('/:IdPaciente',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    handleInputErrors,
    MedicacionController.crearMedicacionController
) 

router.get('/:IdPaciente', MedicacionController.obtenerMedicacionController)

router.put('/:id/paciente/:IdPaciente',
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    handleInputErrors,
    MedicacionController.editarMedicacionController
)    
export default router