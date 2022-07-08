import joi from "joi";
import db from "../db.js"

export default async function validateLogin(req, res, next){
    const login = req.body;

    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().min(4)
    })
    const { error } = loginSchema.validate(login);

    if(error){
        return res.sendStatus(422)
    }
    try {
        const verifyUser = await db.collection("users").findOne({ email: login.email });
        if (!verifyUser){
            return res.status(404).send("Usuário não cadastrado!")
        }
    } catch (error) {
        return res.status(401).send("erro ao validar o login")
    }
    next();
}