const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

const app = express();
const port = 3000;

const url = process.env.BASE_URL;

app.use(express.static(path.join(__dirname, "../..", "public")));
app.set("views", path.join(__dirname, "../..", "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const repos = "";
  res.render("home", { repos });
});

app.get("/repos", async (req, res) => {
  const config = {
    method: "get",
    url: "https://api.github.com/users/thoughtlesslabs/repos",
    // auth: {
    //   username: "token",
    //   password: "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",
    // },
    headers: {
      Accept: "application/vnd.github.v3+json",
      "If-None-Match":
        'W/"92d4d07191f6cf55451f5fb93cc8368e7f97dc535ffe829681071c35bf22169e"',
    },
  };

  await axios(config)
    .then(function (response) {
      const repos = response.data;
      // for (let repo in repos) {
      //   const newLI = document.createElement("li");
      //   newLI.innerText = repos[repo].name;
      //   repoName.append(newLI);
      // }
      console.log(response.status);
      console.log(response.headers);
      return repos;
    })
    .catch(function (error) {
      console.log(error);
    });
  res.render("home", { repos });
});

app.listen(port, () => {
  console.log("listening on port 3000");
});
