import { Request, Response, NextFunction } from "express";

export default function safeRoute(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}

// import { Request, Response, NextFunction } from "express";

// type AsyncHandler = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => Promise<void>;

// export const safeRoute = (handler: AsyncHandler) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await handler(req, res, next);
//     } catch (err: unknown) {
//       const error = err as { message: string };
//       res.status(500).json({ error: error.message || "Server Error" });
//     }
//   };
// };
