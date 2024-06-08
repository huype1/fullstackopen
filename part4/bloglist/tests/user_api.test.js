const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

describe('when there is one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeds with a distinct username", async () => {
    const usersAtStart = await helper.userInDb();
    const newUser = {
      username: "huypedz",
      name: "Quoc Huy",
      password: "bophuy23",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const userAtEnd = await helper.userInDb();
    assert.strictEqual(usersAtStart.length + 1, userAtEnd.length);

    const usernames = userAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with statuscode and message if username is taken", async () => {
    const usersAtStart = await helper.userInDb();
    const newUser = {
      username: 'root',
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const userAtEnd = await helper.userInDb();
    assert(result.body.error.includes('expect `username` to be unique'));

    assert.strictEqual(usersAtStart.length, userAtEnd.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
