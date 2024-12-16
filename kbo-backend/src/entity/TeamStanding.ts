import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Team } from "./Team";

@Entity("team_standings")
export class TeamStanding {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Team, (team) => team.id)
    @JoinColumn({ name: "team_id" })
    team!: Team;

    @Column({ type: "year" })
    season!: number;

    @Column({ type: "int" })
    games!: number;

    @Column({ type: "int" })
    wins!: number;

    @Column({ type: "int" })
    losses!: number;

    @Column({ type: "int" })
    ties!: number;

    @Column({ type: "decimal", precision: 5, scale: 3 })
    winRate!: number;

    @Column({ type: "decimal", precision: 4, scale: 1, nullable: true })
    gamesBehind?: number;

    @Column({ type: "varchar", length: 20, nullable: true })
    lastTenGames?: string;

    @Column({ type: "varchar", length: 10, nullable: true })
    streak?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    homeRecord?: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    awayRecord?: string;
}
