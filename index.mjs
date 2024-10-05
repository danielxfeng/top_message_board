import express from "express";
import dotEnv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const Message = (title, text, author) => {
    return { title, text, author, dt: new Date() };
};

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

let messages = [];

messages.push(Message("Hello", "Hello there", "Tommi"));
messages.push(Message("Hi", "Hi there", "Mike"));

app.get("/", (req, res) => {
  res.render("index", { title: "Fancy Message Board", h1: "Messages", messages: messages });
});

const port = dotEnv.config().parsed.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
