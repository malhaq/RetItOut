import express from "express";
import connectDB from "./DB/connection.js";
import initApp from "./SRC/Modules/app.router.js";

const app = express();
const PORT = 3000;

connectDB();
initApp(app,express);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})