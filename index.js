import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import lodash from "lodash";

const app = express();
const port = 3000;
const _ = lodash;

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

app.get("/posts/:postTitle", (req, res) => {
    const postTitle = _.lowerCase(req.params.postTitle);
    let postIndex;

    posts.forEach(post => {
        if (_.lowerCase(post.title) === postTitle) {
            console.log("Match found!");
            postIndex = posts.indexOf(post);
        }
    })
    console.log(postIndex);
    const post = posts[postIndex];
    res.render("post.ejs", {
        post: post,
    })
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