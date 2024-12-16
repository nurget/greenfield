import { Router } from "express";
import { matchupController } from "../controllers/matchupController";

const router = Router();

router.get("/", matchupController.list);
router.post("/", matchupController.create);

export default router;
