import { Application, Request, Response, NextFunction } from "express";
import { verifySignUp } from "../middlewares";
import { signup, signin } from "../controllers/auth.controller";

export default function (app: Application): void {
  app.use(function (req: Request, res: Response, next: NextFunction): void {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      
    ],
    signup
  );

  app.post("/api/auth/signin", signin);
}