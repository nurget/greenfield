import { Router } from "express";
import { positionController } from "../controllers/positionController";

const router = Router();

router.get("/", positionController.list);
router.post("/", positionController.create);

export default router;
