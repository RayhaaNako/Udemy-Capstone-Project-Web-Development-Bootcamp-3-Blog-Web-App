import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

//* Post Object Constructor
class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.rawDate = new Date();
        this.date = this.rawDate.toLocaleString();
    }
}

//* Add Post
function addPost(title, content) {
    const post = new Post(title, content);
    posts.push(post);

    console.log(posts);
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

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];

    addPost(title, content);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});