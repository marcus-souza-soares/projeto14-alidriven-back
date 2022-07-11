import db from '../db.js';
import { ObjectId } from "mongodb";


export async function gettingProducts(req,res){
    try{
        const products = await db.collection('products').find().toArray();
        res.send(products);
    }catch{
        res.status(500).send("Não foi possivel acessar produtos do site");
    }
}



export async function gettingOneProduct(req,res){
    const {id} = req.params;
    try{
        const product = await db.collection('products').findOne({_id: new ObjectId(id)});
        res.send(product);
    }catch{
        res.status(500).send("Não foi possivel acessar o produto");
    }
}