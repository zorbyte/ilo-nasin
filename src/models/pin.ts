import { Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

import { Nasin } from "./nasin";
import { User } from "./user";

@Entity()
export class Pin {
  @PrimaryColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @OneToOne(() => Nasin)
  nasin!: Nasin;
}
