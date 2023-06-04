import { InferSchemaType, Schema, model } from "mongoose";

const studentSchema = new Schema({
    idno: {type: String, require: true, unique: true},
    lastname: {type: String, require: true},
    firstname: {type: String, require: true},
    middlename: {type: String, require: true},
    course: {type: String, require: true},
    level: {type: String, require: true},
})

type Student = InferSchemaType<typeof studentSchema>

export default model<Student>("User", studentSchema)