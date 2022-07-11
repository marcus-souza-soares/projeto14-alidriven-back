import db from '../db.js';
import { ObjectId } from "mongodb";

function ordersMainInfo(order){
    const obj = {
        _id: order._id,
        date: order.date
    }
    return(obj);
}
export async function gettingOrders(req,res){
    try{
        const orders = await db.collection('orders').find().toArray();
        res.send(orders.map(ordersMainInfo));
    }catch{
        res.status(500).send("Não foi possivel acessar pedidos do site");
    }
}
export async function gettingOneOrder(req,res){
    const {id} = req.params;
    try{
        const order = await db.collection('orders').findOne({_id: new ObjectId(id)});
        res.send(order);
    }catch{
        res.status(500).send("Não foi possivel acessar o pedido");
    }
}