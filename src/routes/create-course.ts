import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { isInteger } from "../utils";
import { AppDataSource } from "../data-source";
import { Course } from "../models/course";


/*create new course
curl -X POST http://localhost:9002/api/courses -H "Content-Type: application/json" -d "{\"url\":\"new course ghassen\",\"title\":\"new course ghassen\",\"iconUrl\":\"https://angular-university.s3-us-west-1.amazonaws.com/course-images/typescript-bootcamp-2.jpg\",\"longDescription\":\"Learn in depth the Typescript language, build practical real-world projects\",\"category\":\"BEGINNER\"}"*/



export async function createCourse(request: Request, response: Response, next: NextFunction){


try {
    logger.debug(`Called createCourse()`)
   
    const data = request.body; 
    
    if (!data){
        throw `no data available, cannot save course.`
    }


    const course = await AppDataSource.manager.transaction(
        "REPEATABLE READ", 
        async (transactionalEntityManager) => {

            const repository = transactionalEntityManager.getRepository(Course); 

            const result = await repository
            .createQueryBuilder("courses")
            .select("MAX(courses.seqNo)", "max")
            .getRawOne();

            const course = repository
                .create({
                    ...data,
                    seqNo: (result?.max ?? 0) + 1

            });

            await repository.save(course);

            return course;


        }
    );

    response.status(200).json({course});
            



}
catch(error){

    logger.error(`error executing createCourse()`);
    return next(error);

}

}