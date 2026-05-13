import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from './routes/user'
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',userRoutes);


mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is connected")
    app.listen(PORT,()=>console.log(`Server at http://localhost:${PORT}`))
})
.catch((err)=> console.error("MongoDB errors: ",err))
