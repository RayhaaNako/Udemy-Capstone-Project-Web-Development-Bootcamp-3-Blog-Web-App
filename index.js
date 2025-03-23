import express from "express";
import bodyParser from "body-parser";
import moment from "moment";
import Swal from "sweetalert2";

//* Initialize Project
const app = express();
const port = 3000;
const posts = [];

//* Post Object Constructor
class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.date = moment().format('ddd, d/M/yyyy | HH:mm');
    }
}

//* Add Post
function addPost(title, content) {
    const post = new Post(title, content);
    posts.push(post);
}

//* Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}

//* Edit Post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}

//* Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//* Render the home screen
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

//* Create post function
app.post("/create", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});

//* Delete post function
app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);

    deletePost(id);
    
    res.redirect("/");
});

//* Render the selected post to view
app.get("/view/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts[id];

    res.render("view.ejs", {postId: id, title: post.title, content: post.content, date: post.date});
});

//* Render the edit form for updating selected post
app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts[id];

    res.render("edit.ejs", {postId: id, title: post.title, content: post.content, date: post.date});
});

app.post("/update", (req, res) => {
    let id = req.body["id"];
    let title = req.body["title"];
    let content = req.body["content"];
    let date = req.body["date"]

    editPost(id, title, content);
    res.render("view.ejs", {postId: id, title: title, content: content, date: date});
});

//* Listener
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});