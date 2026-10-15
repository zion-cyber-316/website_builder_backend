const dns =require( "dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require('cors')
const connectedDB = require("./database/config");
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config()


const port = process.env.PORT || 5500
app.use(cors({
    origin :[ "http://localhost:5173",
    "https://website-builder-frontend-fz70.onrender.com"],
    
    credentials : true
}))


const AuthRouter = require('./routes/auth')
const websiteRouter = require('./routes/website')
const paymentRouter = require('./routes/payment')


app.use(express.json());
app.use(cookieParser())


app.use('/api',AuthRouter)
app.use('/api',websiteRouter)
app.use('/api',paymentRouter)

app.get("/health",(req,res)=>{
            const token = req.cookies.token
            console.log(token)
    return res.json({token : token})

})




app.listen(port , ()=>{
    connectedDB()
    console.log(`app is listening on port ${port}`)
})
