// require("dotenv").config();
// console.log(process.env);
const repoName = document.querySelector("#repo_name");

const config = {
  method: "get",
  url: "https://api.github.com/users/thoughtlesslabs/repos",
  auth: {
    username: "token",
    password: "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",
  },
  headers: {
    Accept: "application/vnd.github.v3+json",
    "If-None-Match":
      'W/"92d4d07191f6cf55451f5fb93cc8368e7f97dc535ffe829681071c35bf22169e"',
  },
};

axios(config)
  .then(function (response) {
    const repos = response.data;
    for (let repo in repos) {
      const newLI = document.createElement("li");
      newLI.innerText = repos[repo].name;
      repoName.append(newLI);
    }
    console.log(response.status);
    console.log(response.headers);
  })
  .catch(function (error) {
    console.log(error);
  });
