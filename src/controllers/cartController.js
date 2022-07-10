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