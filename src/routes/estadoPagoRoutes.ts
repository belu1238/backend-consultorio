import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { EstadoPagoController } from "../controllers/EstadoPagoController";

const router = Router()

router.get('/',
    EstadoPagoController.obtenerEstados
)


export default router