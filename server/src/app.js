import express from "express";
import cors from "cors"

const app = express();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routes import

import UserRoutes from "./routes/user.routes.js"

app.use("/users" , UserRoutes)

export  default app