import { Router } from "express";
import { handleInputErrors } from "../middleware/validation";
import { TipoEspecialidadController } from "../controllers/TipoEspecialidadController";


const router = Router()

router.post('/', handleInputErrors, TipoEspecialidadController.crearTipoEspecialidad)

router.get('/', TipoEspecialidadController.obtenerTiposEspecialidad)

export default router