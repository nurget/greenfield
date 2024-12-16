import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Player } from "./Player";

@Entity("matchups")
export class Matchup {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Player, (player) => player.id, { nullable: false })
    @JoinColumn({ name: "pitcher_id" })
    pitcher!: Player;

    @ManyToOne(() => Player, (player) => player.id, { nullable: false })
    @JoinColumn({ name: "batter_id" })
    batter!: Player;

    @Column({ type: "int" })
    season!: number;

    @Column({ type: "json" })
    stats!: object;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
