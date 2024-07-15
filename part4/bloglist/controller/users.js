const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //still don't know tf is this for but they say it is effective for decryption
  const saltRounds = 10;
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'Password length needed to be at least 3 character' })
  }
  else {
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
      try {
        const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
      });

      const savedUser = await user.save();

      response.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
}
  
});

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1});
    res.json(users)
})

module.exports = usersRouter;
