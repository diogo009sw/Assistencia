import { Router } from "express";
import * as controller from "../controllers/ordensController.js";

const router = Router();

router.get("/ordens", controller.listar);
router.get("/ordens/:id", controller.buscar);
router.post("/ordens", controller.criar); // 🔥 GERA A OS
router.put("/ordens/:id", controller.atualizar);
router.delete("/ordens/:id", controller.excluir);

export default router;