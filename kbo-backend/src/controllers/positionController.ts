import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Position } from "../entity/Position";

export const positionController = {
    list: async (req: Request, res: Response) => {
        try {
            const positions = await AppDataSource.getRepository(Position).find();
            res.json(positions);
        } catch (error) {
            console.error("Error fetching positions:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const position = AppDataSource.getRepository(Position).create({ name });
            await AppDataSource.getRepository(Position).save(position);
            res.status(201).json(position);
        } catch (error) {
            console.error("Error creating position:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
