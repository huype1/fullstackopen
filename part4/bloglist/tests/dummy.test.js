const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
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
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
];

describe("dummy", () => {
  test("dummy return one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("When list is empty, the likes equal to 0", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test("calculate the sums of likes with a normal array list", () => {
    const resultnormal = listHelper.totalLikes(blogs);
    assert.strictEqual(resultnormal, 36);
  });
});

describe("find most liked blogs", () => {
  test("when list is empty, return 0 as the most likes", () => {
    assert.deepStrictEqual(listHelper.favouriteBlog([]), {});
  });

  test("when list only has one blog, it is the most favourable blog", () => {
    const resultSingular = listHelper.favouriteBlog(listWithOneBlog);
    assert.deepStrictEqual(resultSingular, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("A normal blog list with 2 of the same biggest likes", () => {
    const result = listHelper.favouriteBlog(blogs);
    assert.deepStrictEqual(result, 
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      });
  });

});

describe("find author with most blogs", () => {
  test("empty blog list", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {})
  })

  test("the average list", () => {
    const answer = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(answer, { author: "Robert C. Martin", blogs: 3})
  })

  test('one blog list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {author: "Edsger W. Dijkstra", blogs: 1})
  })
})

describe("Author with the most like in all blogs", () => {
  test("empty blog list", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {})
  })

  test("blog list", () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    })
  })

  test("blog with one list", () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {author: "Edsger W. Dijkstra", likes: 5}) 
  })
})
