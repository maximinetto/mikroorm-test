import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config.js";

export default async function init() {
  const orm = await MikroORM.init(config);
  return orm;
}