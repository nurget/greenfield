import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Team } from "../entity/Team";
import { TeamStanding } from "../entity/TeamStanding";
import { TeamMatchup } from "../entity/TeamMatchup";

export const teamController = {
    list: async (req: Request, res: Response): Promise<void> => {
        try {
            const teams = await AppDataSource.getRepository(Team).find();
            res.json(teams);
        } catch (error) {
            console.error("Error fetching teams:", error);
            res.status(500).json({ message: "Failed to fetch teams. Please try again later." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        try {
            const teamId = Number(req.params.id);
            const team = await AppDataSource.getRepository(Team).findOne({ where: { id: teamId } });

            if (!team) {
                res.status(404).json({ message: `Team with ID ${teamId} not found.` });
                return;
            }

            res.json(team);
        } catch (error) {
            console.error("Error fetching team by ID:", error);
            res.status(500).json({ message: "Failed to fetch the team. Please try again later." });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, shortName, city } = req.body;

            const team = AppDataSource.getRepository(Team).create({ name, shortName, city });
            await AppDataSource.getRepository(Team).save(team);

            res.status(201).json(team);
        } catch (error) {
            console.error("Error creating team:", error);
            res.status(500).json({ message: "Failed to create the team. Please try again later." });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        try {
            const teamId = Number(req.params.id);
            const { name, shortName, city } = req.body;

            const team = await AppDataSource.getRepository(Team).findOne({ where: { id: teamId } });

            if (!team) {
                res.status(404).json({ message: `Team with ID ${teamId} not found.` });
                return;
            }

            Object.assign(team, { name, shortName, city });
            await AppDataSource.getRepository(Team).save(team);

            res.json(team);
        } catch (error) {
            console.error("Error updating team:", error);
            res.status(500).json({ message: "Failed to update the team. Please try again later." });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const teamId = Number(req.params.id);

            const team = await AppDataSource.getRepository(Team).findOne({ where: { id: teamId } });

            if (!team) {
                res.status(404).json({ message: `Team with ID ${teamId} not found.` });
                return;
            }

            await AppDataSource.getRepository(Team).remove(team);
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting team:", error);
            res.status(500).json({ message: "Failed to delete the team. Please try again later." });
        }
    },

    getSummary: async (req: Request<{ teamId: string }, {}, {}, { season?: string }>, res: Response): Promise<void> => {
        try {
            const teamId = Number(req.params.teamId);
            const season = req.query.season ? Number(req.query.season) : new Date().getFullYear();

            const team = await AppDataSource.getRepository(Team).findOne({ where: { id: teamId } });
            if (!team) {
                res.status(404).json({ message: "Team not found." });
                return;
            }

            const standing = await AppDataSource.getRepository(TeamStanding).findOne({
                where: { team: { id: teamId }, season },
            });

            const matchups = await AppDataSource.getRepository(TeamMatchup).find({
                where: [
                    { homeTeam: { id: teamId }, season },
                    { awayTeam: { id: teamId }, season },
                ],
                relations: ["homeTeam", "awayTeam"],
            });

            const matchupSummary = matchups.map((m) => ({
                opponent: m.homeTeam.id === teamId ? m.awayTeam.name : m.homeTeam.name,
                wins: m.homeTeam.id === teamId ? m.wins : m.losses,
                losses: m.homeTeam.id === teamId ? m.losses : m.wins,
                ties: m.ties,
            }));

            res.json({
                team: team.name,
                season,
                totalGames: standing?.games || 0,
                wins: standing?.wins || 0,
                losses: standing?.losses || 0,
                ties: standing?.ties || 0,
                winRate: standing?.winRate || 0,
                matchups: matchupSummary,
            });
        } catch (error) {
            console.error("Error fetching team summary:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
