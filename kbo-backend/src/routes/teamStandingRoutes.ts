import { Router } from "express";
import { teamStandingController } from "../controllers/teamStandingController";

const router = Router();

// 모든 팀 순위 조회
router.get("/", (req, res) => teamStandingController.list(req, res));

// 특정 팀 순위 조회
router.get("/:id", (req, res) => teamStandingController.getById(req, res));

// 새로운 팀 순위 생성
router.post("/", (req, res) => teamStandingController.create(req, res));

// 팀 순위 수정
router.put("/:id", (req, res) => teamStandingController.update(req, res));

// 팀 순위 삭제
router.delete("/:id", (req, res) => teamStandingController.delete(req, res));

export default router;
