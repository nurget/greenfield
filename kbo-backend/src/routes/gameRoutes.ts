import { Router } from "express";
import { gameController } from "../controllers/gameController";

const router = Router();

router.get("/", gameController.list);
router.post("/", gameController.create);

export default router;
