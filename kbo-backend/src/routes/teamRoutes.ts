import { Router } from "express";
import { teamController } from "../controllers/teamController";

const router = Router();

// 모든 팀 조회
router.get("/", (req, res) => teamController.list(req, res));

// 특정 팀 조회
router.get("/:id", (req, res) => teamController.getById(req, res));

// 새 팀 생성
router.post("/", (req, res) => teamController.create(req, res));

// 팀 정보 수정
router.put("/:id", (req, res) => teamController.update(req, res));

// 팀 삭제
router.delete("/:id", (req, res) => teamController.delete(req, res));

// 팀 요약 정보 조회
router.get("/:teamId/summary", (req, res) => teamController.getSummary(req, res));

export default router;
