import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game";

export const gameController = {
    list: async (req: Request, res: Response) => {
        try {
            const games = await AppDataSource.getRepository(Game).find({
                relations: ["homeTeam", "awayTeam", "stadium"],
            });
            res.json(games);
        } catch (error) {
            console.error("Error fetching games:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const { season, gameType, homeTeamId, awayTeamId, stadiumId, homeScore, awayScore } = req.body;
            const game = AppDataSource.getRepository(Game).create({
                season,
                gameType,
                homeTeam: { id: homeTeamId },
                awayTeam: { id: awayTeamId },
                stadium: { id: stadiumId },
                homeScore,
                awayScore,
            });
            await AppDataSource.getRepository(Game).save(game);
            res.status(201).json(game);
        } catch (error) {
            console.error("Error creating game:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
