import { RequestHandler } from "express";
import createHttpError from "http-errors";
import StudentModel from "../models/students";


export const getStudents: RequestHandler = async (req, res, next) => {
    try {
        const students = await StudentModel.find().exec()
        res.status(200).json(students)
    } catch (error) {
        next(error)
    }
}


export const getStudent: RequestHandler =async (req, res, next) => {
    const studentId = {
        idno: req.params.studentId
    }
    try {
        const student = await StudentModel.findOne(studentId)

        if(!student){
            throw createHttpError(404, "Student not found.")
        }

        res.status(200).json(student)
    } catch (error) {
        next(error)
    }
}

interface CreatestudentBody {
    idno?: string,
    lastname?: string,
    firstname?: string,
    middlename?: string,
    course?: string,
    level?: string,
}

export const createStudent: RequestHandler<unknown, unknown, CreatestudentBody, unknown> = async (req, res, next) => {
    const idno = req.body.idno
    const lastname = req.body.lastname
    const firstname = req.body.firstname
    const middlename = req.body.middlename
    const course = req.body.course
    const level = req.body.level
    try {
        if (!idno || !lastname || !firstname || !middlename || !course || !level) {
            throw createHttpError(400, "All are required for a Student data")
        }

        const newUser = await StudentModel.create({
            idno: idno,
            lastname: lastname,
            firstname: firstname,
            middlename: middlename,
            course: course,
            level: level
        })

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

interface UpdateStudentID {
    studentId?: string,
}

interface UpdateStudentBody {
    lastname?: string,
    firstname?: string,
    middlename?: string,
    course?: string,
    level?: string,
}

export const updateStudent: RequestHandler<UpdateStudentID, unknown, UpdateStudentBody, unknown> = async (req, res, next) => {
    const studentId = req.params.studentId
    const data = {
        newLastname: req.body.lastname,
        newFirstname: req.body.firstname,
        newMiddlename: req.body.middlename,
        newCourse: req.body.course,
        newLevel: req.body.level,
    }
    try {

        const student = await StudentModel.findOne({ idno: studentId })

        if (!student) {
            throw createHttpError(404, "Student not found.")
        }

        student.lastname = data.newLastname
        student.firstname = data.newFirstname
        student.middlename = data.newMiddlename
        student.course = data.newCourse
        student.level = data.newLevel

        const studentUpdated = await student.save()
        res.status(200).json(studentUpdated)
    } catch (error) {
        next(error)
    }
}


export const deleteStudent:RequestHandler =async (req, res, next) => {
    const studentId = {
        idno: req.params.studentId
    }
    try {
        const student = await StudentModel.findOne(studentId)

        if(!student){
            throw createHttpError(404, "Student not found.")
        }

        await student.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}