const express = require("express");
const path = require("path");
const { searchForRepos, deleteRepo } = require("./app");

const mongoose = require("mongoose");
const repos = require("../../models/repos");

mongoose.connect("mongodb://localhost:27017/nooben_source");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../..", "public")));
app.set("views", path.join(__dirname, "../..", "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const allRepos = await repos.find({});
  res.render("home", { repos: allRepos });
});

app.get("/find-repos", async (req, res) => {
  await searchForRepos();
  res.redirect("/");
});

app.get("/delete-repos", async (req, res) => {
  await deleteRepo();
  res.redirect("/");
});

app.listen(port, () => {
  console.log("listening on port 3000");
});
