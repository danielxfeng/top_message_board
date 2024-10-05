import express from "express";
import dotEnv from "dotenv";

const app = express();

const port = dotEnv.config().parsed.PORT || 8080;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
