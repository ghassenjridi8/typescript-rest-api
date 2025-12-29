import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { calculatePasswordHash } from "../utils";
const crypto = require("crypto");


/*add new user 

curl -X POST http://localhost:9002/api/users -H "Content-Type: application/json" -d "{\"email\":\"new-user@angular-university-1.io\",\"pictureUrl\":\"https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png\",\"password\":\"test123\",\"isAdmin\":\"false\"}"

with jwt authorizatrion


curl -X POST http://localhost:9002/api/users -H "Content-Type: application/json" -d "{\"email\":\"new-user@angular-university-1.io\",\"pictureUrl\":\"https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png\",\"password\":\"test123\",\"isAdmin\":\"false\"}" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AYW5ndWxhci11bml2ZXJzaXR5LmlvIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzY2OTYwNjcxfQ.KaLkMz16ot1JvYwrtGPOsmm_WoA80UGzJKhbsNmFpUU"*/


export async function createUser(request: Request, response: Response, next: NextFunction){


    try{


        logger.debug(`Called createCourse()`)
   
        const {email, pictureUrl, password, isAdmin} = request.body; 
        
        if (!email){
            throw `no email available, cannot save course.`}

        if (!password){
            throw `no email available, cannot save course.`}
        

        const repository = AppDataSource.getRepository(User);

        const user = await repository.createQueryBuilder("users")
                .where("email = :email", {email})
                .getOne();

        if (user){

            const message = `user with email ${email} already exists, aborting.`
            logger.error(message);
            response.status(500).json({message});
            return;

        }   


        const passwordSalt = crypto.randomBytes(64).toString("hex");

        const passwordHash = await calculatePasswordHash(password, passwordSalt);


        const newUser = repository
                .create({
                    email,
                    pictureUrl,
                    isAdmin,
                    passwordHash,
                    passwordSalt

            });

        await AppDataSource.manager.save(newUser);

        logger.info(`User ${email} has been created`);


        response.status(200).json({
            email,
            pictureUrl,
            isAdmin
        });





    }

    catch(error){
        logger.error(`error executing createUser()`);
        return next(error);
    }


}