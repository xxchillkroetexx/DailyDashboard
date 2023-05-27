import { Request, Response, NextFunction } from "express";
import UserModel from "../models/UserSchema";

const User = new UserModel;

const checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: NextFunction): void => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err: Error, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err: Error, user: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

export default verifySignUp;