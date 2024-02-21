import { MikroORM } from "@mikro-orm/core";
import Person from "./src/entities/Person.js";
import init from "./src/mikroorm.js";

describe.concurrent("Person", () => {
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await init();
    const generator = orm.getSchemaGenerator();
    await generator.createSchema();
  });

  afterEach(async () => {
    const em = orm.em.fork();
    await em.nativeDelete(Person, {});
  });

  afterAll(async () => {
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await orm.close(true);
  });

  test("a", async () => {
    const em = await orm.em.fork();
    await em.begin();
    const person = new Person({ name: "Maximiliano Minetto" });
    await em.persist(person);
    await em.flush();

    const people = await em.findAll(Person, {});
    expect(people.length).toBe(1);
    expect(people[0].name).toBe("Maximiliano Minetto");
    await em.commit()
  });

  test("b", async () => {
    const em = await orm.em.fork();
    await em.begin();
    const person = new Person({ name: "Pepe Argento" });
    await em.persist(person);
    await em.flush();

    const people = await em.findAll(Person, {});
    expect(people.length).toBe(1);
    expect(people[0].name).toBe("Pepe Argento");

    const pepe = people[0];
    pepe.name = "Pepe el vago";
    await em.persist(pepe);

    const updatedPerson = await em.findOne(Person, { name: "Pepe el vago" });
    expect(updatedPerson).toBeDefined();
    expect(await em.count(Person, {})).toBe(1);
    await em.commit()

  })
});


//this works concurrently
// test.concurrent("a", async () => {
//   await orm.em.transactional(async em => {
//     const person = new Person({ name: "Maximiliano Minetto" });
//     await em.persist(person);

//     const people = await em.findAll(Person, {});
//     expect(people.length).toBe(1);
//     expect(people[0].name).toBe("Maximiliano Minetto");
//   });
// });

// test.concurrent("b", async () => {
//   await orm.em.transactional(async em => {
//     const person = new Person({ name: "Pepe Argento" });
//     await em.persist(person);

//     const people = await em.findAll(Person, {});
//     expect(people.length).toBe(1);
//     expect(people[0].name).toBe("Pepe Argento");

//     const pepe = people[0];
//     pepe.name = "Pepe el vago";
//     await em.persist(pepe);

//     const updatedPerson = await em.findOne(Person, { name: "Pepe el vago" });
//     expect(updatedPerson).toBeDefined();
//     expect(await em.count(Person, {})).toBe(1);
//   })
// });