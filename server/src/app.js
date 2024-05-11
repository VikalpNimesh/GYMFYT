import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "pages")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile("pages/ultrafyt.html");
});

app.get("/login", (req, res) => {
    res.sendFile("pages/login.html");
});

app.get("/signup", (req, res) => {
    res.sendFile("pages/signup.html");
});

// routes import
import UserRoutes from "./routes/user.routes.js";

app.use("/users", UserRoutes);

export default app;
