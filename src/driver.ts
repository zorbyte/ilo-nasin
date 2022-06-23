import { DataSource } from "typeorm";

import { logError } from "./lib/error";
import { Nasin } from "./models/nasin";
import { Pin } from "./models/pin";
import { User } from "./models/user";

const source = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "admin",
  database: "test",
  entities: [User, Pin, Nasin],
  synchronize: true,
  logging: false,
});

export async function connectToDatabase() {
  await source
    .initialize()
    .catch(err => logError("failed to start database", err));
}
