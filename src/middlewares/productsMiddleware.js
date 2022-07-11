import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import db from "../db.js";

export async function userValidate(req, res, next) {
    const { authorization } = req.headers;
    console.log(authorization)
    const token = authorization?.replace("Bearer ", "");
    const secret_key = process.env.JWT_SECRET;
    try {
        const dados = jwt.verify(token, secret_key);
        const user = await db.collection("users").findOne({ _id: new ObjectId(dados.userId) });
        console.log(user);
        res.locals.dados = dados;
        next();
    } catch (error) {
        res.status(404).send("Error ao validar o usuário");
    }
}