const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
describe("dummy", () => {
  test("dummy return one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  const blogs = [
    {
      _id: "4a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 6,
      __v: -1,
    },
    {
      _id: "4a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 4,
      __v: -1,
    },
    {
      _id: "4a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD7xx/EWD808.html",
      likes: 11,
      __v: -1,
    },
    {
      _id: "4a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/05/TestDefinitions.htmll",
      likes: 9,
      __v: -1,
    },
    {
      _id: "4a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/03/03/TDD-Harms-Architecture.html",
      likes: -1,
      __v: -1,
    },
    {
      _id: "4a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2015/05/01/TypeWars.html",
      likes: 1,
      __v: -1,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("When list is empty, the likes equal to 0", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test("calculate the sums of likes with a normal array list", () => {
    const resultnormal = listHelper.totalLikes(blogs);
    assert.strictEqual(resultnormal, 30);
  });
});
