const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require('jsonwebtoken')

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token"})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  });
  
  if (isNaN(blog.likes)) {
    blog.likes = 0;
  }
  const savedBlogs = await blog.save();
  console.log(savedBlogs)
  user.blogs = user.blogs.concat(savedBlogs._id)
  await user.save()

  response.status(201).json(savedBlogs);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = request.body 

  if (isNaN(blog.likes)) {
    blog.likes = 0;
  }  

  // response.json(updatedBlog);
    try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }

  
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  //204 is used for no content along with 404 so we will use for deletion
  response.status(204).end();
});

module.exports = blogsRouter;
