const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.blogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.blogs[1])
    await blogObject.save()

})

test('blogs get returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/) 

})

test('when there are 2 distinct blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual (response.body.length, helper.blogs.length)

})

test('The first blog is about react', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(blog => blog.title)

    assert.strictEqual(title.includes("React patterns"), true)

})

test('add a valid blog', async () => {
  const newBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await helper.allBlogs()
  assert.strictEqual(response.length, helper.blogs.length+ 1)
  const content = response.map(blog => blog.title)
  assert(content.includes('Canonical string reduction'))


})

test.only('an empty blog will not be added', async () => {
  const newBlog = {

  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

  const response = await helper.allBlogs() 
  assert.strictEqual(response.length, helper.blogs.length)
})

after(async () => {
    await mongoose.connection.close()
})