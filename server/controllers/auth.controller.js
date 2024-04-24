import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password, photo } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ username, email, password, photo });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Please enter all fields"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    if (validUser.password !== password) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      { id: validUser.id, isAdmin: validUser.isAdmin },
      "secret_key",
    );

    const { password: pass, ...rest } = validUser._doc; //remove password from response

    // res
    //   .status(200)
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .json(rest);
    res.status(200).json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        "secret_key",
      );
      console.log(token);
      const { password, ...rest } = user._doc;
      // res
      //   .status(200)
      //   .cookie("access_token", token, {
      //     httpOnly: true,
      //   })
      //   .json(rest);
      res.status(200).json({ ...rest, token });
    } else {
      const generatedPassword = email + Math.random().toString(36).slice(-8);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: generatedPassword,
        photo: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        "secret_key",
      );
      const { password, ...rest } = newUser._doc;
      // res
      //   .status(200)
      //   .cookie("access_token", token, {
      //     httpOnly: true,
      //   })
      //   .json(rest);
      res.status(200).json({ ...rest, token });
    }
  } catch (error) {
    next(error);
  }
};
