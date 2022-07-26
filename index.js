const express = require('express')
const app = express()
const cors=require('cors')
const port=process.env.PORT ||5000;

const db=require('./models')
app.use(cors())
app.use(express.json())


// Routers
const postRouter=require("./routes/user")
app.use("/api/user",postRouter)


db.sequelize.sync().then(()=>{    
    app.listen(port, () => console.log("listening"))
})
