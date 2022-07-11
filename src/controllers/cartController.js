import db from '../db.js';
import { ObjectId } from "mongodb";

export async function addingProduct(req,res){
    const id = res.locals.userId;
    try{
        const cart = await db.collection('carts').findOne({userId: new ObjectId(id)});
        await db.collection('carts').updateOne({userId: new ObjectId(id)},{ $push: { products: req.body }});
        res.send(cart);
    }catch(error){
        res.send(error.details)
    }
}




export async function getCart(req, res) {
    const dados = res.locals.dados;
    try {
        const cart = await db.collection("carts").findOne({ userId: dados.userId })
        res.status(200).send(cart);
    } catch (error) {
        res.status(404).send("Não encontrei o carrinho")
    }
}

export async function postCart(req, res) {
    const dados = res.locals.dados;
    const body = req.body;
    try {
        const cart = await db.collection("carts").findOne({ userId: dados.userId });
        if (!cart) {
            await db.collection("carts").insertOne({ products: [body], userId: dados.userId });
        } else {
            await db.collection("carts").updateOne(
                { userId: dados.userId },
                { $push: { products: body } }
            )
        }
        res.status(201).send("Funcionou");
    } catch (error) {
        res.send(error.details)
    }
}

export async function deleteCart(req, res) {
    const dados = res.locals.dados;
    const body = req.body;
    try {
        const cart = await db.collection("carts").findOne({ userId: dados.userId });
        await db.collection("carts").updateOne(
            { userId: dados.userId },
            { $set: { products: [] } }
        );
        res.status(201).send(cart)
    } catch (error) {
        res.status(404).send("Não deletou o carrinho")
    }
}
export async function deleteItemOfCart(req, res) {
    const body = req.body;
    const { id } = req.query;
    const dados = res.locals.dados;

    const cart = await db.collection("carts").findOne(
        { userId: dados.userId }
    );
    const products = cart.products;

    if (cart) {
        let newArr = products.filter(e => {
            const { _id } = e
            console.log(_id)
            return _id === id ? false : true
        })
        console.log(newArr)
        await db.collection("carts").updateOne(
            { userId: dados.userId },
            { $set: { products: newArr } }
        );
    } else {
        res.status(422).send("Não foi pssível encontrar o carrinho!");
    }

    res.status(201).send(await db.collection("carts").findOne({ userId: dados.userId }));
}

export async function postPurchase(req, res) {
    const body = req.body;
    const dados = res.locals.dados;
    try {
        await db.collection("purchases").insertOne({ ...body, userId: dados.userId, date: dayjs().format("DD/MM") })
        const purchases_arr = await db.collection("purchases").find({ userId: dados.userId }).toArray();
        res.status(201).send(purchases_arr);
    } catch (error) {
        res.status(422).send("Não foi possivel adicionar pedidos")
    }
}