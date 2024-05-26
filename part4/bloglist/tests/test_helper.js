const Blog = require('../models/blog')
const initialBlogs = [
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
}];

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'React Suck',
        author: 'The Primeagen',
        url: 'http://www.u.arizona.edu/~rubinson'
    })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()

}

const allinitialBlogs = async () => {
    const allblog = await Blog.find({})
    return allblog.map(blog => blog.toJSON())

}

module.exports = {
    initialBlogs,
    nonExistingId,
    allinitialBlogs,

}
