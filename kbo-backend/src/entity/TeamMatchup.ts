import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "./Team";

@Entity("team_matchups")
export class TeamMatchup {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Team, (team) => team.id)
    @JoinColumn({ name: "home_team_id" })
    homeTeam!: Team;

    @ManyToOne(() => Team, (team) => team.id)
    @JoinColumn({ name: "away_team_id" })
    awayTeam!: Team;

    @Column({ type: "year" })
    season!: number;

    @Column({ type: "int" })
    wins!: number;

    @Column({ type: "int" })
    losses!: number;

    @Column({ type: "int" })
    ties!: number;
}
