// Write your tests here

const db = require("../data/dbConfig");
const Users = require("./auth/user-model");
const server = require("./server");
const request = require("supertest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run;
});

afterAll(async () => {
  await db.destroy();
});

describe("Auth register tests", () => {
  test("/api/auth/register responds username password required if either are missing", async () => {
    let result = await request(server)
      .post("/api/auth/register")
      .send({ username: "username" });
    expect(result.body).toMatchObject({
      message: "username and password required",
    });
  });
  test("/api/auth/register returns username taken if username is taken", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "bar" });
    const result = await request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "bar" });
    expect(result.body).toMatchObject({ message: "username taken" });
  });
});

describe("Auth login tests", () => {
  test("/api/auth/login responds welcome message on success", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "bar" });

    const result = await request(server)
      .post("/api/auth/login")
      .send({ username: "foo", password: "bar" });

    expect(result.body).toMatchObject({ message: "welcome, foo" });
  });

  test("/api/auth/login responds invalid credentials message if incorrect password is given", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "foo", password: "bar" });

    const result = await request(server)
      .post("/api/auth/login")
      .send({ username: "foo", password: "ba" });

    expect(result.body).toMatchObject({ message: "invalid credentials" });
  });
});
