import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Blog Hub</h1>");
});

app.listen(port, () => {
    console.log("Listen at port: " + port);
});