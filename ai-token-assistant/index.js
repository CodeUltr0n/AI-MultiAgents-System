import "./env.js"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.js"
import {serve} from "inngest/express"
import tokenRoutes from "./routes/token.js"
import { inngest } from "./inngest/client.js"
import {onUserSignup} from "./inngest/functions/onsignup.js"
import {onTokenCreated} from "./inngest/functions/ont-token-create.js"

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth',userRoutes);
app.use('/api/tokens',tokenRoutes);


app.use("/api/inngest",
    serve({
        client:inngest,
        functions:[onUserSignup,onTokenCreated]
    })
);


mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is connected")
    app.listen(PORT,()=>console.log(`Server at http://localhost:${PORT}`))
})
.catch((err)=> console.error("MongoDB errors: ",err))
