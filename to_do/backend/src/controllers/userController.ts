import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user"
import bcrypt from "bcrypt"


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {

    try {
        const user = await UserModel.findById(req.session.userId).select("+email").exec()
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

interface SignUpBody{
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password

    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters are missing")
        }

        const existingUser = await UserModel.findOne({username: username}).exec()
        if(existingUser){
            throw createHttpError(409, "Username is already in use.")
        }

        const existingEmail = await UserModel.findOne({email: email}).exec()
        if(existingEmail){
            throw createHttpError(409, "Email is already in use. Please Login instead.")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10)

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed
        })

        req.session.userId = newUser._id

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}


interface LoginBody{
    username?: string,
    password?: string
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        if(!username || !password){
            throw createHttpError(400, "Parameters are missing.")
        }
        
        const user = await UserModel.findOne({username: username}).select("+password +email").exec()

        if(!user){
            throw createHttpError(401, "Invalid Login Credentials.")
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const passwordMatch = await bcrypt.compare(password, user.password!)

        if(!passwordMatch){
            throw createHttpError(401, "Invalid Login Credentials.")
        }

        req.session.userId = user._id
        res.status(201).json(user)

    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = async(req, res, next) => {
    req.session.destroy(error => {
        if(error){
            next(error)
        }else{
            res.sendStatus(200)
        }
    })
}