import express from "express";

const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
app.get("/*", (_, res) => res.redirect("/"));

app.listen(3003, () => {
  console.log("listening port 3003 : video call http server");
});
