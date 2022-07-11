import db from '../db.js';
import { ObjectId } from "mongodb";

function purchasesMainInfo(order){
    const obj = {
        _id: order._id,
        date: order.date
    }
    return(obj);
}
export async function gettingPurchases(req,res){
    try{
        const purchases = await db.collection('purchases').find().toArray();
        res.send(purchases.map(purchasesMainInfo));
    }catch{
        res.status(500).send("Não foi possivel acessar pedidos do site");
    }
}
export async function gettingOnePurchase(req,res){
    const {id} = req.params;
    try{
        const purchase = await db.collection('purchases').findOne({_id: new ObjectId(id)});
        res.send(purchase);
    }catch{
        res.status(500).send("Não foi possivel acessar o pedido");
    }
}