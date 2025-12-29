import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";


export function defaultErrorHandler(err, request: Request, response: Response, next: NextFunction) {

    logger.error(`default error handler triggered; reason:`, err);

    if (response.headersSent) {
        logger.error(`Response was already written, delegating to built-in Express erro handler.`)
        return next(err);
    }

    response.status(500).json({
        status: "error",
        message: "Default error handling triggered, check logs."
    })

}