import express, { NextFunction, Request, response, Response } from "express"
import { connectDB } from "./Config/index";
import authRouter from "./Route/AuthRoute";
import cors from "cors";
import HttpException from "./Error/HttpException";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "./Response/HttpResponse";

const port = 4000;

export class Server {

    private app = express();


    startServer() {

        this.app.use(function (req: Request, res: Response, next: NextFunction) {
            res.header("Access-Control-Allow-Origin", "http://localhost:5174");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors({
            // try "http://localhost:3000"
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,

        }))
        this.app.use('/auth', authRouter);


        this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            if (err) {
                console.log("The error name is ===> ", err.name)

                if (err.name === "UnauthorizedError") {
                    if (err.inner.name === "JsonWebTokenError") {
                        res.status(401).send(new HttpResponse("error", "UnauthorizedError"));

                    } else if (err.inner.name === "TokenExpiredError") {
                        res.status(401).send(new HttpResponse("error", "UnauthorizedError"));

                    } else {
                        res.status(401).send(new HttpResponse("error", "UnauthorizedError"));

                    }
                } else if (err.name == "Error") {
                    res.status(400).send(new HttpResponse("error", "Bad Request"));

                }
                else {
                    res.status(500).send(new HttpResponse("error", "Internal Server Error"));

                }
            }
        });

        //this prints the error in the console, rather than in the response!
        this.app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack)
            res.status(err.status || 500).send({ error: err.message })
            next();
        })

        this.app.listen(port, () => {
            this.DBconnection()
            console.log('Listening on port ' + port)
        })
    }




    private async DBconnection() { connectDB() }

}



new Server().startServer();