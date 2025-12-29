import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { calculatePasswordHash } from "../utils";
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


/*Login windows cmd:

non admin
curl -X POST http://localhost:9002/api/login -H "Content-Type: application/json" -d "{\"email\":\"new-user@angular-university.io\",\"password\":\"test123\"}"

admin
curl -X POST http://localhost:9002/api/login -H "Content-Type: application/json" -d "{\"email\":\"admin@angular-university.io\",\"password\":\"admin\"}"*/



export async function login(request: Request, response: Response, next: NextFunction){

    try{
        logger.debug(`called login()`);

        const {email, password} = request.body;

        if(!email){
            throw `could not extract email from the request, aborting!`;

        }


        if(!password){
            throw `could not extract password from the request, aborting!`;

        }


        const user = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("users")
        .where("email = :email", {email})
        .getOne();


        if (!user){

            const message = `login denied`;
            logger.info(`${message} - ${email} does not exist!`);
            response.status(403).json({message});
            return;


        }

        const passwordHash = await calculatePasswordHash(password, user.passwordSalt);
        if (user.passwordHash != passwordHash) {

            
            const message = `login denied, wrong password`;
            logger.info(`${message} -  user with ${email} has entered the wrong password!`);
            response.status(403).json({message});
            return;

        }

        logger.info(`User ${email} has now logged in`);

        const {pictureUrl, isAdmin} = user;

        const authJwt = {
                userId: user.id,
                email,
                isAdmin
        };

        const authJwtToken = jwt.sign(authJwt, JWT_SECRET);



        response.status(200).json({
            user: {
                email, 
                pictureUrl,
                isAdmin
            },
            authJwtToken
        });


    }


    

    catch(error){

        logger.error(`error calling login()`);
        return next(error);
    }
    
}