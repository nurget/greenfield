import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("teams")
export class Team {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50 })
    name!: string;

    @Column({ type: "varchar", length: 10 })
    shortName!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    city?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
