import { Router } from "express";
import { body } from "express-validator";
import { ObraSocialController } from "../controllers/ObraSocialController";
import { handleInputErrors } from "../middleware/validation";


const router = Router()

router.post('/',handleInputErrors, ObraSocialController.crearObraSocial)
router.get('/',handleInputErrors, ObraSocialController.obtenerObrasSociales)

export default router