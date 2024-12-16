import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // 개발 중에만 사용
    logging: true,
    entities: ["src/entity/**/*.ts"],
});
