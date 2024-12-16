import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { TeamMatchup } from "../entity/TeamMatchup";
import { Team } from "../entity/Team";

export const teamMatchupController = {
    // 모든 팀간 경기 기록 조회
    list: async (req: Request, res: Response): Promise<void> => {
        try {
            const { season } = req.query;

            const matchups = await AppDataSource.getRepository(TeamMatchup).find({
                where: season ? { season: Number(season) } : {},
                relations: ["homeTeam", "awayTeam"],
            });

            res.json(matchups);
        } catch (error) {
            console.error("Error fetching team matchups:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 특정 팀간 경기 기록 조회
    getById: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const matchupId = Number(req.params.id);

            const matchup = await AppDataSource.getRepository(TeamMatchup).findOne({
                where: { id: matchupId },
                relations: ["homeTeam", "awayTeam"],
            });

            if (!matchup) {
                res.status(404).json({ message: `Matchup with ID ${matchupId} not found.` });
                return;
            }

            res.json(matchup);
        } catch (error) {
            console.error("Error fetching matchup by ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 새로운 팀간 경기 기록 생성
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const { homeTeamId, awayTeamId, season, wins, losses, ties } = req.body;

            const homeTeam = await AppDataSource.getRepository(Team).findOne({ where: { id: homeTeamId } });
            const awayTeam = await AppDataSource.getRepository(Team).findOne({ where: { id: awayTeamId } });

            if (!homeTeam || !awayTeam) {
                res.status(404).json({ message: "One or both teams not found." });
                return;
            }

            const matchup = AppDataSource.getRepository(TeamMatchup).create({
                homeTeam,
                awayTeam,
                season,
                wins,
                losses,
                ties,
            });

            await AppDataSource.getRepository(TeamMatchup).save(matchup);
            res.status(201).json(matchup);
        } catch (error) {
            console.error("Error creating matchup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 팀간 경기 기록 수정
    update: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const matchupId = Number(req.params.id);
            const { homeTeamId, awayTeamId, season, wins, losses, ties } = req.body;

            const matchup = await AppDataSource.getRepository(TeamMatchup).findOne({
                where: { id: matchupId },
            });

            if (!matchup) {
                res.status(404).json({ message: `Matchup with ID ${matchupId} not found.` });
                return;
            }

            if (homeTeamId) {
                const homeTeam = await AppDataSource.getRepository(Team).findOne({ where: { id: homeTeamId } });
                if (!homeTeam) {
                    res.status(404).json({ message: `Home team with ID ${homeTeamId} not found.` });
                    return;
                }
                matchup.homeTeam = homeTeam;
            }

            if (awayTeamId) {
                const awayTeam = await AppDataSource.getRepository(Team).findOne({ where: { id: awayTeamId } });
                if (!awayTeam) {
                    res.status(404).json({ message: `Away team with ID ${awayTeamId} not found.` });
                    return;
                }
                matchup.awayTeam = awayTeam;
            }

            Object.assign(matchup, { season, wins, losses, ties });
            await AppDataSource.getRepository(TeamMatchup).save(matchup);

            res.json(matchup);
        } catch (error) {
            console.error("Error updating matchup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // 팀간 경기 기록 삭제
    delete: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        try {
            const matchupId = Number(req.params.id);

            const matchup = await AppDataSource.getRepository(TeamMatchup).findOne({
                where: { id: matchupId },
            });

            if (!matchup) {
                res.status(404).json({ message: `Matchup with ID ${matchupId} not found.` });
                return;
            }

            await AppDataSource.getRepository(TeamMatchup).remove(matchup);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting matchup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
