
import joi from "joi";
import db from "../db.js"

export default async function validateSignUp(req, res, next) {
    const new_user = req.body;
    const createUserSchema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error } = createUserSchema.validate(new_user);

    if (error) {
        return res.sendStatus(401);
    }
    try {
        const verifySignUp = await db.collection('users').findOne({ email: new_user.email });
        if (verifySignUp) {
            return res.status(401).send("Usuário já existe!");
        }
    } catch (error) {
        return res.sendStatus(422);
    }
    next();
}