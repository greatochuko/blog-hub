import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consectetur optio cum exercitationem quas repellendus in, cumque reiciendis? Omnis vitae architecto rerum provident rem officiis voluptatum fugiat, debitis animi eius!"
const aboutStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consectetur optio cum exercitationem quas repellendus in, cumque reiciendis? Omnis vitae architecto rerum provident rem officiis voluptatum fugiat, debitis animi eius!"
const contactStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consectetur optio cum exercitationem quas repellendus in, cumque reiciendis? Omnis vitae architecto rerum provident rem officiis voluptatum fugiat, debitis animi eius!"

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        homeStartingContent: homeStartingContent,
        posts: posts,
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs", {
        aboutStartingContent: aboutStartingContent,
    });
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        contactStartingContent: contactStartingContent
    });
});

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.blogTitle,
        content: req.body.blogContent
    }
    posts.push(post);
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Listen at port: " + port);
});