import { Request, Response, NextFunction } from "express";

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
  const secret = req.headers["x-admin-secret"];

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
}
