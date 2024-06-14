const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware');
const { error } = require("../utils/logger");

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


blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const userPost = request.user 

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
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
  user.blogs = user.blogs.concat(savedBlogs._id)
  await user.save()

  response.status(201).json(savedBlogs);
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = request.body 
  if (isNaN(blog.likes)) {
    blog.likes = 0;
  }  

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

blogsRouter.delete("/:id", async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id);
  const deleter = await User.findById(decodedToken.id)
  const userDelete = request.user 

  if (!blog) {
    response.status(404).json({ error: "Cant find this blog" })
  }

  if (decodedToken.id.toString() === blog.user.toString()) {
    try {
      await Blog.findByIdAndDelete(request.params.id)
  
      deleter.blogs = deleter.blogs.filter(blog => blog.id.toString() !== request.params.id)
      //204 is used for no content along with 404 so we will use for deletion
      response.status(204).end();
    }
    catch (error) {
      next(error)
    }
  }

  else {
    response.status(401).json({ error : "You cannot delete this blog" })
  } 

});

module.exports = blogsRouter;
