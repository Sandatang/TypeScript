import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type: String, require: true, unique: true,},
    email: {type: String, require: true, unique: true, select: false},
    password: {type: String, require: true, select: false}
})

type User = InferSchemaType<typeof userSchema>

export default model<User>("User", userSchema)