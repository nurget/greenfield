import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Matchup } from "../entity/Matchup";

export const matchupController = {
    list: async (req: Request, res: Response) => {
        try {
            const matchups = await AppDataSource.getRepository(Matchup).find({
                relations: ["pitcher", "batter"],
            });
            res.json(matchups);
        } catch (error) {
            console.error("Error fetching matchups:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const { pitcherId, batterId, season, stats } = req.body;
            const matchup = AppDataSource.getRepository(Matchup).create({
                pitcher: { id: pitcherId },
                batter: { id: batterId },
                season,
                stats,
            });
            await AppDataSource.getRepository(Matchup).save(matchup);
            res.status(201).json(matchup);
        } catch (error) {
            console.error("Error creating matchup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
