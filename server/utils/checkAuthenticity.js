import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    return next(errorHandler(401, "Unauthorized"));
  }
};
