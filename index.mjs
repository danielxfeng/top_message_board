import express from "express";
import dotEnv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// The model: Message
const Message = (title, text, author) => {
  return { title, text, author, dt: new Date() };
};

// The data: messages, and add some initial messages
let messages = [];

messages.push(Message("Hello", "Hello there", "Tommi"));
messages.push(Message("Hi", "Hi there", "Mike"));

// Set up the express app
const app = express();

// Set up the view engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Get routers for / and /new
app.get("/", (req, res) => {
  res.render("index", {
    title: "Fancy Message Board",
    h1: "Messages",
    messages: messages,
  });
});

app.get("/new", (req, res) => {
  res.render("new", {
    title: "New Message",
    h1: "Add New Message",
  });
});

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Post route for /new
app.post("/new", (req, res) => {
  messages.push(Message(req.body.title, req.body.text, req.body.author));
  res.redirect("/");
});

// Start the server
const port = dotEnv.config().parsed.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
