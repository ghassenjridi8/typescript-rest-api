import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import { isInteger } from "../utils";
import { AppDataSource } from "../data-source";
import { Lesson } from "../models/lesson";
import { Course } from "../models/course";


/*delete Course 
curl -X DELETE http://localhost:9002/api/courses/78*/

export async function deleteCourseAndLessons(request: Request, response: Response, next: NextFunction){

    try{

            const courseId = request.params.courseId

            if (!isInteger(courseId)){
                    throw `Invalid course id ${courseId}`;
                }

            await AppDataSource.manager.transaction(
                async (transactionalEntityManager) => {

                    transactionalEntityManager
                        .createQueryBuilder()
                        .delete()
                        .from(Lesson)
                        .where("courseId = :courseId", {courseId})
                        .execute();

                    transactionalEntityManager
                        .createQueryBuilder()
                        .delete()
                        .from(Course)
                        .where("id = :courseId", {courseId})
                        .execute();
                }
            );

            response.status(200).json({
                message:`course ${courseId} deleted successfully`})



        }

    catch(error){
        logger.error(`error executing createCourse()`);
            return next(error);
    }



}