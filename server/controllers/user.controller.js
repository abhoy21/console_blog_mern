import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to update this user"),
    );
  }

  if (req.body.password && req.body.password.length < 3) {
    return next(errorHandler(400, "Password must be at least 6 characters"));
  }

  if (
    req.body.username &&
    (req.body.username.length < 3 ||
      req.body.username.length > 20 ||
      req.body.username.includes(" ") ||
      req.body.username !== req.body.username.toLowerCase() ||
      !req.body.username.match(/^[a-zA-Z0-9]+$/))
  ) {
    return next(
      errorHandler(
        400,
        "Username must be between 3 and 20 characters, lowercase, and can only contain letters and numbers",
      ),
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true },
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

// export const signout = (req, res, next) => {
//   try {
//     res
//       .clearCookie("access_token")
//       .status(200)
//       .json("User has been signed out");
//   } catch (error) {
//     next(error);
//   }
// };

// export const signout = (req, res, next) => {
//   try {
//     localStorage.removeItem("token");
//     res.status(200).json("User has been signed out");
//   } catch (error) {
//     next(error);
//   }
// };

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
