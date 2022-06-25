import { Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm/index.js";

import { Nasin } from "./nasin.js";
import { User } from "./user.js";

@Entity()
export class Pin {
  @PrimaryColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @OneToOne(() => Nasin)
  nasin!: Nasin;
}
