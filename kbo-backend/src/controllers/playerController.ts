import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Player } from "../entity/Player";

export const playerController = {
    list: async (req: Request, res: Response) => {
        const { teamId, positionId, season } = req.query;
        try {
            const players = await AppDataSource.getRepository(Player).find({
                where: {
                    ...(teamId && { team: { id: Number(teamId) } }),
                    ...(positionId && { position: { id: Number(positionId) } }),
                    ...(season && { season: Number(season) }),
                },
                relations: ["team", "position"],
            });
            res.json(players);
        } catch (error) {
            console.error("Error fetching players:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    create: async (req: Request, res: Response) => {
        const { name, teamId, positionId, season, stats } = req.body;
        try {
            const player = AppDataSource.getRepository(Player).create({
                name,
                team: { id: teamId },
                position: { id: positionId },
                season,
                stats,
            });
            await AppDataSource.getRepository(Player).save(player);
            res.status(201).json(player);
        } catch (error) {
            console.error("Error creating player:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    // Update and delete methods would follow a similar structure.
};
