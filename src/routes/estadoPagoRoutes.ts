import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { EstadoPagoController } from "../controllers/EstadoPagoController";
import { authenticate } from "../middleware/Auth";

const router = Router()

router.use(authenticate)

router.get('/',
    EstadoPagoController.obtenerEstados
)


export default router