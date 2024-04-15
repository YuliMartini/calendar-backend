const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwtGenerator");

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User doesn't exists",
      });
    }

    // check passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password",
      });
    }

    // generate JWT
    const token = await generateJWT(user._id, user.name);

    res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "An error has occured. Contact your administrator",
    });
  }
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    user = new User(req.body);

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // save to db
    await user.save();

    // generate JWT
    const token = await generateJWT(user._id, user.name);

    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "An error has occured. Contact your administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // generate JWT
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  loginUser,
  createUser,
  renewToken,
};
