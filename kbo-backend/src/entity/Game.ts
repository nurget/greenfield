import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Team } from "./Team";
import { Stadium } from "./Stadium";

@Entity("games")
export class Game {
    @PrimaryGeneratedColumn()
    id!: number; // 필수 필드로 지정

    @Column({ type: "int" }) // "year" 대신 "int" 사용
    season!: number;

    @Column()
    gameType!: string;

    @ManyToOne(() => Team, (team) => team.id, { nullable: false }) // nullable 설정 추가
    @JoinColumn({ name: "home_team_id" })
    homeTeam!: Team; // 필수 필드로 지정

    @ManyToOne(() => Team, (team) => team.id, { nullable: false })
    @JoinColumn({ name: "away_team_id" })
    awayTeam!: Team;

    @ManyToOne(() => Stadium, (stadium) => stadium.id, { nullable: false })
    @JoinColumn({ name: "stadium_id" })
    stadium!: Stadium;

    @Column()
    homeScore!: number;

    @Column()
    awayScore!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
