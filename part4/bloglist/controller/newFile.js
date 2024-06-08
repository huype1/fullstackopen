const bcrypt = require("bcrypt");
const User = require("../models/user");
const { usersRouter } = require("./users");

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //still don't know tf is this for but they say it is effective for decryption
  const saltRounds = 10;
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'content missing' });
  }
  else {
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
  }

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
});
