import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm/index.js";

import { Nasin as Content } from "../lib/nasin.js";

import { User } from "./user.js";

@Entity()
export class Nasin {
  @PrimaryColumn()
  id!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

  @Column()
  draft!: boolean;

  @Column()
  revision!: number;

  @Column("varchar", { length: 32 })
  name!: string;

  @Column()
  content!: string;

  @OneToOne(() => Nasin)
  @JoinColumn()
  forkedFrom?: Nasin;

  fetchContent(): Content {
    return { name: "TODO", description: "TODO" };
  }
}
