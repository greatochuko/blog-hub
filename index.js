import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import lodash from "lodash";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;
const _ = lodash;

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consectetur optio cum exercitationem quas repellendus in, cumque reiciendis? Omnis vitae architecto rerum provident rem officiis voluptatum fugiat, debitis animi eius!"
const aboutStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consectetur optio cum exercitationem quas repellendus in, cumque reiciendis? Omnis vitae architecto rerum provident rem officiis voluptatum fugiat, debitis animi eius!"
const contactStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consectetur optio cum exercitationem quas repellendus in, cumque reiciendis? Omnis vitae architecto rerum provident rem officiis voluptatum fugiat, debitis animi eius!"

try {
    mongoose.connect("mongodb://127.0.0.1:27017/blogDB");
    console.log("mongoose server connected successfully");
} catch (error) {
    console.log(error);
}

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    const posts = await Post.find();
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

app.get("/posts/:postID", async(req, res) => {
    const postID = req.params.postID;
    try {
        const post = await Post.findById({ _id: postID });
        res.render("post.ejs", {
            post: post,
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/compose", (req, res) => {
    const post = new Post({
        title: req.body.blogTitle,
        content: req.body.blogContent
    });
    post.save();
    res.redirect("/");
});

app.listen(port, () => {
    console.log("Listen at port: " + port);
});