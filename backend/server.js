const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const userRouter = require("./routes/route");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/" , userRouter);
 
const PORT = process.env.PORT|| 8080


mongoose
  .connect("mongodb://127.0.0.1:27017/mern_crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error(" Error connecting to MongoDB:", err));



app.listen(PORT , ()=>{
    console.log(`Server Listen on  port : ${PORT}`);
    
})


