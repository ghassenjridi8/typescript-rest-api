import * as dotenv from "dotenv";

const result = dotenv.config();
import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Course } from "./course";
import { Lesson } from "./lesson";
import { IsNull, Not } from "typeorm";
import { User } from "./user";

async function deleteDb() {

     await AppDataSource.initialize();

    console.log(`Database connection ready.`);

    console.log(`Clearing LESSONS table.`);

    //await AppDataSource.getRepository(Lesson).delete({ id: Not(IsNull()) });
    await AppDataSource.getRepository(Lesson).delete({});

    console.log(`Clearing COURSES table.`);

    //await AppDataSource.getRepository(Course).delete({ id: Not(IsNull()) });

    await AppDataSource.getRepository(Course).delete({});

    console.log(`Clearing Users table.`);

    await AppDataSource.getRepository(User).delete({});

}


deleteDb()
    .then(() => {
        console.log(`finished deleting database, exiting!`);
        process.exit(0);
    })
    .catch(err => {
        console.log('Error deleting database.', err);
    });