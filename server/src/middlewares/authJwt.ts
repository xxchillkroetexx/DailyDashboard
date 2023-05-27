import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../auth.config";
import UserModel from "../models/UserSchema";

const User = new UserModel;


const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token as string, config.secret, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

    
const authJwt = {
  verifyToken,
};

export default authJwt;
