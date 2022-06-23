import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  // Discord user ID is a snowflake, which can't fit in to
  // a javascript number, so we ought to store it as a string.
  @PrimaryColumn()
  id!: string;

  @Column("varchar", { length: 32 })
  nickname!: string;
}
