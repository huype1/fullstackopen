const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});


  //cant use forEach loop inside of beforeEach because it'll make multiple asynchronous operation so before Each won't wait for them
  const blogObject = helper.blogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)

  //if you want to save object in a specific order
  //   for (let note of helper.initialNotes) {
  //     let noteObject = new Note(note)
  //     await noteObject.save()
  // }
});

test("blogs get returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.blogs.length);
});

test("The first blog is about react", async () => {
  const response = await api.get("/api/blogs");
  const title = response.body.map((blog) => blog.title);

  assert.strictEqual(title.includes("React patterns"), true);
});

test.only("each blog have a distinct id", async () => {
  const allBlogs = await helper.getAllBlogs();
  const idList = allBlogs.map(blog => blog.id)

  const checkid = (idList) => {
    const set = new Set();
    for (let id in idList) {
      if (set.has(id)) {
        return false;
      }
      else {
        set.add(id);
      }
    }
    return true;
  }
  assert.strictEqual(checkid(idList), true)
})

test("add a valid blog", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  await api
    .post("/api/blogs/")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.getAllBlogs();
  assert.strictEqual(response.length, helper.blogs.length + 1);
  const content = response.map((blog) => blog.title);
  assert(content.includes("Canonical string reduction"));

});


test("an empty blog will not be added", async () => {
  const newBlog = {
    author: "Bruh who tf"
  };
  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await helper.getAllBlogs('api/blogs');
  assert.strictEqual(response.length, helper.blogs.length);
});

test.only("add blog likes when it doesn't have one", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };

  await api
    .post("/api/blogs/")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.getAllBlogs();
  assert.strictEqual(response.length, helper.blogs.length + 1);
  const likes = response.map((blog) => blog.likes);
  assert(likes.includes(0));

});
after(async () => {
  await mongoose.connection.close();
});
