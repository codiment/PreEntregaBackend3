import { Router } from "express";
const router = Router();
//Importamos el controllador:
import mocksController from "../controllers/mocks.controller.js";

//Endpoint para obtener mascotas y usuarios simuladas
router.get('/mockingusers', mocksController.getMockingUsers);

router.get('/mockingpets', mocksController.getMockingPets);

router.post('/generatedata', mocksController.generateData);

export default router;