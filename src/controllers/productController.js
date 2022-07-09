import db from '../db.js';


export async function gettingProducts(req,res){
    try{
        const products = await db.collection('products').find().toArray();
        res.send(products);
    }catch{
        res.status(500).send("Não foi possivel acessar produtos do site");
    }
}