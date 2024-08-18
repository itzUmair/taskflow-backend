import { NextFunction, Request, Response } from "express";

const LoggerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${new Date()} - ${req.method} ${req.path}`);
  next();
};

export default LoggerMiddleware;
