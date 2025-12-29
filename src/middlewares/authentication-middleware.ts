import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

export function checkIfAuthenticated(request: Request, response: Response, next: NextFunction){


    const authJwtToken = request.headers.authorization;

    if (!authJwtToken){

        logger.info(`JWT is not present, access denied`);
        response.sendStatus(403).json;
        return ;

    }

    checkjwtValidity(authJwtToken)
        .then(user =>{

            logger.info(`authentication JWT successfully decoded`, user);

            request["user"] = user;

            next();

        })
        .catch(err => {
            logger.error(`could not validate the JWT authentication, access denied.`, err);
            response.sendStatus(403);
        })


}


async function checkjwtValidity(authJwtToken:string){


    const user = jwt.verify(authJwtToken, JWT_SECRET);

    logger.info(`Found user details in JWT:`, user);


    return user;


}