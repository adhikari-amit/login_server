const express = require('express')
const app = express()
const cors=require('cors')

const db=require('./models')
app.use(cors())
app.use(express.json())


// Routers
const postRouter=require("./routes/user")
app.use("/api/user",postRouter)


db.sequelize.sync().then(()=>{    
    app.listen(8000, () => console.log("listening"))
})
