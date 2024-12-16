import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { TeamStanding } from "../entity/TeamStanding";
import { Team } from "../entity/Team";

export const teamStandingController = {
    // 모든 팀 순위 조회
    list: async (req: Request, res: Response): Promise<void> => {
        try {
            const { season } = req.query;

            const standings = await AppDataSource.getRepository(TeamStanding).find({
                where: season ? { season: Number(season) } : {},
                relations: ["team"], // 팀 정보를 함께 조회
            });

            res.json(standings);
        } catch (error) {
            console.error("Error fetching team standings:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 특정 팀 순위 조회
    getById: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const standingId = Number(req.params.id);

            const standing = await AppDataSource.getRepository(TeamStanding).findOne({
                where: { id: standingId },
                relations: ["team"], // 팀 정보를 함께 조회
            });

            if (!standing) {
                res.status(404).json({ message: `Team standing with ID ${standingId} not found.` });
                return;
            }

            res.json(standing);
        } catch (error) {
            console.error("Error fetching team standing by ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 새로운 팀 순위 생성
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const { teamId, season, games, wins, losses, ties, winRate, gamesBehind, lastTenGames, streak, homeRecord, awayRecord } = req.body;

            const team = await AppDataSource.getRepository(Team).findOne({ where: { id: teamId } });
            if (!team) {
                res.status(404).json({ message: `Team with ID ${teamId} not found.` });
                return;
            }

            const standing = AppDataSource.getRepository(TeamStanding).create({
                team,
                season,
                games,
                wins,
                losses,
                ties,
                winRate,
                gamesBehind,
                lastTenGames,
                streak,
                homeRecord,
                awayRecord,
            });

            await AppDataSource.getRepository(TeamStanding).save(standing);
            res.status(201).json(standing);
        } catch (error) {
            console.error("Error creating team standing:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 팀 순위 수정
    update: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const standingId = Number(req.params.id);
            const { teamId, season, games, wins, losses, ties, winRate, gamesBehind, lastTenGames, streak, homeRecord, awayRecord } = req.body;

            const standing = await AppDataSource.getRepository(TeamStanding).findOne({
                where: { id: standingId },
            });

            if (!standing) {
                res.status(404).json({ message: `Team standing with ID ${standingId} not found.` });
                return;
            }

            if (teamId) {
                const team = await AppDataSource.getRepository(Team).findOne({ where: { id: teamId } });
                if (!team) {
                    res.status(404).json({ message: `Team with ID ${teamId} not found.` });
                    return;
                }
                standing.team = team;
            }

            Object.assign(standing, { season, games, wins, losses, ties, winRate, gamesBehind, lastTenGames, streak, homeRecord, awayRecord });
            await AppDataSource.getRepository(TeamStanding).save(standing);

            res.json(standing);
        } catch (error) {
            console.error("Error updating team standing:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 팀 순위 삭제
    delete: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const standingId = Number(req.params.id);

            const standing = await AppDataSource.getRepository(TeamStanding).findOne({
                where: { id: standingId },
            });

            if (!standing) {
                res.status(404).json({ message: `Team standing with ID ${standingId} not found.` });
                return;
            }

            await AppDataSource.getRepository(TeamStanding).remove(standing);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting team standing:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
