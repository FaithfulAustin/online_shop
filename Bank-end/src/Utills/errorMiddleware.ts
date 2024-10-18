import { Request, Response, NextFunction } from "express";
import HttpException from "../Error/HttpException";
import HttpResponse from "../Response/HttpResponse";
import { StatusCodes } from "http-status-codes";

export function errorMiddleware(err: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong';
    
    console.error(`[${status}] - ${message}`); // Log error for debugging

    res.status(status).send(new HttpResponse('error', message));
}

export function wrapAsync(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
  }
