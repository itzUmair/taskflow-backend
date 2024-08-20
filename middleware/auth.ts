import { NextFunction, Request, Response } from "express";

async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.authtoken;
  console.log(token);
  next();
}

export default AuthMiddleware;
