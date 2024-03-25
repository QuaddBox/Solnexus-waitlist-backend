import "reflect-metadata";
import { DataSource } from "typeorm";
import { Waitlist } from "./entity/Waitlist";
import { env } from "../config";
export const AppDataSource = new DataSource({
  type: "mongodb",
  synchronize: true,
  url: env.MONGO_URL,
  logging: false,
  entities: [Waitlist],
  migrations: [],
  subscribers: [],
});
