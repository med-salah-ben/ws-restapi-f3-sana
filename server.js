const express = require("express");
require("dotenv").config();

const connectDB = require("./config/connectDB");
const contactRouter = require("./routes/contactRoutes")

const app = express();
connectDB();
// middleware
app.use(express.json());
//Route Middleware
app.use("/api/contact" , contactRouter)

const PORT = process.env.PORT || 8020;

app.listen(PORT,(err)=>{
    err?
    console.log(err):console.log(`server is running on port ${PORT}`)
})