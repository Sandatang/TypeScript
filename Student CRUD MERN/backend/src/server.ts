import app from "./app"
import env from "./util/validateEnv"
import mongoose from "mongoose"


mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Mongoose Connected")


        app.listen(env.PORT, () => {
            console.log("Listening at port " + env.PORT)
        })
    })
    .catch(console.error)