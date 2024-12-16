import { Router } from "express";
import { teamMatchupController } from "../controllers/teamMatchupController";

const router = Router();

// 모든 팀간 경기 기록 조회
router.get("/", teamMatchupController.list);

// 특정 팀간 경기 기록 조회
router.get("/:id", teamMatchupController.getById);

// 새로운 팀간 경기 기록 생성
router.post("/", teamMatchupController.create);

// 팀간 경기 기록 수정
router.put("/:id", teamMatchupController.update);

// 팀간 경기 기록 삭제
router.delete("/:id", teamMatchupController.delete);

export default router;
