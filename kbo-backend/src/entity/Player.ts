import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Team } from "./Team";
import { Position } from "./Position";

@Entity("players")
export class Player {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @ManyToOne(() => Team, (team) => team.id)
    @JoinColumn({ name: "team_id" })
    team!: Team;

    @ManyToOne(() => Position, (position) => position.id)
    @JoinColumn({ name: "position_id" })
    position!: Position;

    @Column({ type: "year" })
    season!: number;

    @Column({ type: "json" })
    stats!: object;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
