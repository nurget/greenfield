import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Team } from "./Team";

@Entity("stadiums")
export class Stadium {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 255 })
    location!: string;

    @Column()
    capacity!: number;

    @ManyToOne(() => Team, (team) => team.id, { nullable: true })
    @JoinColumn({ name: "team_id" })
    team?: Team | null;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
