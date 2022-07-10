import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../db.js';
import dotenv from 'dotenv';
dotenv.config();

export async function loginUser(req, res) {
    const user = req.body;

    
    const secret_key = process.env.JWT_SECRET;
    const configuracoes = { expiresIn: 60 * 60 *3 }
    
    try {
        const userDb = await db.collection('users').findOne({email: user.email});
        if (userDb && bcrypt.compareSync(user.password, userDb.password)) {
            const dados = { userId: userDb._id }
            const token = jwt.sign(dados, secret_key, configuracoes)
        
            await db.collection('sessions').insertOne({
              token,
              userId: userDb._id
            });
        
            return res.status(201).send({ token });
          } else {
            return res.status(401).send('Senha ou email incorretos!');
          }
    } catch (error) {
        res.status(400).send("Não foi possivel fazer login")
    }
}


export async function createUser(req, res) {
    console.log("oii")
    const new_user = req.body;

    const crypted_password = bcrypt.hashSync(new_user.password, 10);
    try {
        await db.collection('users').insertOne({
            name: new_user.name,
            email: new_user.email,
            password: crypted_password
        });
        const newUserSuccess = await db.collection('users').findOne({email: new_user.email});
        await db.collection('carts').insertOne({
            products: [],
            userId: newUserSuccess._id
        })
        res.status(201).send("Usuário criado!")
    } catch (error) {
        res.status(401).send("deu ruim")
    }
}