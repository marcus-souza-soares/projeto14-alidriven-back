import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import db from "../db.js";
import dotenv from 'dotenv';
dotenv.config();

export function userValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const secret_key = process.env.JWT_SECRET;
    const dados = jwt.verify(token, secret_key);
    if (dados) {
        res.locals.userId = dados.userId;
        next();
    }else{
        res.status(404).send("Error ao validar o usuário");
    }


  
}