import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export default class Person {

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  constructor({ id, name }: { id?: number, name: string }) {
    if (id)
      this.id = id;
    this.name = name;
  }
}