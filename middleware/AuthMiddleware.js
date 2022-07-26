const {verify}=require("jsonwebtoken")

const validateTokenMiddleware=(req,res,next)=>{
    const accessToken= req.cookies["access-token"]
    if(!accessToken) return res.json({error:"User not logged in!"})
    try {
        const validateToken=verify(accessToken,"importantsalttosecuredataontoken")
        req.user=validateToken
        if (validateToken){
            return next()
        }

    } catch (error) {
        return res.json({error:error})
    }
}

module.exports ={validateTokenMiddleware}