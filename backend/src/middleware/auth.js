//Authentication
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header || !header.startsWith("Bearer ")) {
      const error = new Error("Access Denied");
      error.status = 401;
      throw error;
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //user id + role
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
