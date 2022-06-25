import { DataSource } from "typeorm/index.js";

import { Nasin } from "./models/nasin.js";
import { Pin } from "./models/pin.js";
import { User } from "./models/user.js";

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
    .catch(err => console.error("failed to start database", err));
}
