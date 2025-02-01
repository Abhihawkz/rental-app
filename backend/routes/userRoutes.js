import { Router } from "express";

const router = Router();
router.post("/register",(req,res)=>{
    res.json({msg:"registered"})
})

router.get("/login",(req,res)=>{
    res.json({msg:"login"})
})

router.get("/me",(req,res)=>{
    res.json({msg:"me"})
})


export default router;
