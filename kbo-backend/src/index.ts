import express from "express";
import playerRoutes from "./routes/playerRoutes";
import teamRoutes from "./routes/teamRoutes";
import positionRoutes from "./routes/positionRoutes";
import gameRoutes from "./routes/gameRoutes";
import matchupRoutes from "./routes/matchupRoutes";
import teamStandingRoutes from "./routes/teamStandingRoutes.ts";
import {AppDataSource} from "./data-source.ts";
import teamMatchupRoutes from "./routes/teamMatchupRoutes.ts";

const app = express();
app.use(express.json());

app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/matchups", matchupRoutes);
app.use("/api/team-standings", teamStandingRoutes);
app.use("/api/team-matchups", teamMatchupRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
