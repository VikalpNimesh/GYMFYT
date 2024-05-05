dotenv.config();
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 5000

connectDB()
    .then(() => {
        app.listen(port, () => {
        console.log("Server Running at " + port)
    })
})
    .catch((err) => {
    console.log("mongo connection failed !!!" , err)
})
