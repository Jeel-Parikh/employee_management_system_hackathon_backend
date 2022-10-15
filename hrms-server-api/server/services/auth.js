import jwt from "jsonwebtoken";
import User from "../models/User";
import { secretKey } from "./constant";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, secretKey);
    const userId = decodedToken.user._id;
    const validUser = await User.findById(userId)
    if (validUser) {
      next();
    }
    else {
      res.json({ response: false });
    }
  }
  catch {
    res.json({ response: false });
  }
};

// export {auth};
export default auth;