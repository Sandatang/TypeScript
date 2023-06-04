import "dotenv/config"
import StudentRoutes from "./routes/studentRoutes"
import express, { NextFunction, Request, Response } from "express"
import { isHttpError } from "http-errors"
const app = express()

app.use(express.json())

app.use("/api/student", StudentRoutes)

app.get("/test", (req,res) => {
    res.send(" Hello World!.")
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = "An unknown error occured"
    let statusCode = 500

    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({error: errorMessage})
})

export default app