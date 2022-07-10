import db from "../db.js";

export async function getProducts(req, res) {
    const products = await db.collection("products").find().toArray();
    res.send(products)
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
        res.status(201).send("Deletou o carrinho")
    } catch (error) {
        res.status(404).send("Não deletou o carrinho")
    }
}