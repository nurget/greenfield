import { Router } from "express";
import { playerController } from "../controllers/playerController";

const router = Router();

router.get("/", playerController.list);
router.post("/", playerController.create);
// Update and delete routes would follow here.

export default router;
