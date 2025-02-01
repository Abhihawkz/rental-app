import { Router } from "express";
import asyncHandler, { adminMiddleware, userMiddleware } from "./middleware.js";
import { z } from "zod";
import { Product } from "../model/dbModel.js";

const router = Router();

const productSchema = z.object({
    name:z.string(),
    image:z.string(),
    description:z.string(),
    price:z.number(),
    available:z.boolean()
})

router.post("/add",adminMiddleware,asyncHandler(async(req,res)=>{
    const {success } = productSchema.safeParse(req.body);
    console.log(req.body);
    if(!success){
        throw new Error("Invalid input types");
    }
    const product = await Product.findOne({name:req.body.name})
    if(product){
        throw new Error("Product already Exists");
    }
    const newProduct = await Product.create({
        name:req.body.name,
        image:req.body.image,
        description:req.body.description,
        price:req.body.price,
        available:req.body.available,
    })
    res.json({response:"Product Sucessfully Added",Product:newProduct})
}))

router.get("/getall",userMiddleware,asyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.json({response:products})
}))

router.get("/getOne/:id",userMiddleware,asyncHandler(async (req,res)=>{
    const id = req.params.id;
    const product = await Product.findOne({_id:id});
    res.json({respnose:product})
}))


export default router;
