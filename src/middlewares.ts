import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import ErrorResponse from "./interfaces/ErrorResponse"
import RequestValidators from "./interfaces/RequestValidators"

export const notFound = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404)
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
    next(error)
}

export const validateRequest = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params) as any;
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query) as any;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
};