# Node REST API with typeORM

Welcome to this project where I build a Node REST API with typeORM!

<br>

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contact](#contact)

 
<br>

## Introduction
This project focuses on building a secure RESTful API using TypeScript, Express, and TypeORM, incorporating authentication, authorization, and structured logging.
- The goal of this project is to strengthen my practical experience with TypeScript, Express, and Node.js while applying best practices for security and API design.

<br>

## Technologies

Here’s what I’m using for this project:

- **Express**:  A lightweight and flexible Node.js web framework used to build APIs and web servers efficiently.
- **TypeORM**: A TypeScript-friendly Object–Relational Mapper (ORM) that enables database interaction through classes and objects instead of raw SQL.
- **Database**: A cloud-hosted PostgreSQL database, deployed using Heroku as the cloud provider.   
- **Winston logging framework**: A flexible Node.js logging library that supports multiple log levels and transports (such as console and file logging) for better monitoring and debugging.
- **Jsonwebtoken**: A library used to generate and verify JSON Web Tokens (JWTs) to authenticate users and authorize access based on their roles. 
- **GitHub**: All my web app code is stored and versioned in this GitHub repository.

<br>

## Setup

To get this project up and running on your local machine, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/ghassenjridi8/typescript-rest-api.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd typescript-rest-api
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Create a .env file in the root of the project and specify the port on which the server should run:**
    ```env
    PORT=9002
    ```


5. **Run server:**
    ```bash
    npm run dev
    ```
6. **Create Postgres database using any cloud provider and add the following information in the .env file**
    ```env=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    ```


7. **Populate database:**
    ```bash
    npm run populate-db
    ```

8. **Delete database:**
    ```bash
    npm run delete-db
    ```


9. **Interact with the backend: login for example: write this command in cmd for windows**
    ```cmd
    curl -X POST http://localhost:9002/api/login -H "Content-Type: application/json" -d "{\"email\":\"admin@angular-university.io\",\"password\":\"admin\"}"
    ```


10. **Interact with the backend: create a new course for example, other commands are available in the models folder**
    ```cmd
    curl -X POST http://localhost:9002/api/courses ^
    -H "Content-Type: application/json" ^
    -H "Authorization: <your jwt token generated after logging in>" ^
    -d "{\"url\":\"new course ghassen\",\"title\":\"new course ghassen\",\"iconUrl\":\"https://angular-university.s3-us-west-1.amazonaws.com/course-images/typescript-bootcamp-2.jpg\",\"longDescription\":\"Learn in depth the Typescript language, build practical real-world projects\",\"category\":\"BEGINNER\"}"
    ```
<br>

## Contact

If you have any questions or comments about my Typescript REST API project, please contact:  
**Ghassen** – [Jridi59@gmail.com](mailto:Jridi59@gmail.com)  
- [LinkedIn]() *(https://www.linkedin.com/in/ghassen-jridi-94b81034a/)*

<br>


