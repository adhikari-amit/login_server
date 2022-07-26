const router=require("express").Router();
const bcrypt=require("bcrypt")
const { Users } =require("../models")
const jwt=require("jsonwebtoken")

router.post("/register",async (req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10)
        const {username,email,password}=req.body
        const hashedPassword=await bcrypt.hash(password,salt)
        const user= await Users.create({
            username:username,
            email:email,
            password:hashedPassword,
        })
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)  
    }
})

router.post("/login",async(req,res)=>{
    try {
        const {username,password}=req.body
        const user=await Users.findOne({where:{username:username}})
        
        if(user){
            const validPassword=await bcrypt.compare(password,user.password)
           
            if(validPassword){
                
                const accessToken=jwt.sign({username:user.username,id:user.id},"importantsalttosecuredataontoken")
                res.cookie("access-token",accessToken,{
                    maxAge:60*60*24*30*1000,
                    httpOnly:true
                })
    
                res.status(200).json("Cookie Created")
            }
            else{
                res.json({error:"Wrong Password"})
            }
        }
        else{
            res.json({error:"User not Found"})
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
})

module.exports= router