import { Router } from "express";

const router = Router();
router.post("/add",(req,res)=>{
    res.json({msg:"registered"})
})

router.get("/getall",(req,res)=>{
    res.json({msg:"login"})
})

router.get("/getone",(req,res)=>{
    res.json({msg:"me"})
})


export default router;
