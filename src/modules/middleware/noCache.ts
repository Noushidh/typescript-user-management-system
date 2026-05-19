import { Request, Response, NextFunction } from "express";

export const noCache = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
};