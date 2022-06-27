const dotenv = require("dotenv").config();
const axios = require("axios");
const Repo = require("../../models/repos");

const url = process.env.BASE_URL;
const api_token = process.env.API_TOKEN;

// Search for repos
const searchForRepos = async () => {
  const queryString =
    "?q=" + encodeURIComponent("label:good-first-issue is:open sort:created");
  const config = {
    method: "get",
    url: `https://api.github.com/search/issues${queryString}`,
    auth: {
      username: "token",
      password: api_token,
    },
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  };
  await axios(config)
    .then((data) => {
      const res = data.data.items;
      for (let i in res) {
        const splitRepo = res[i].html_url.split("/");
        const repoLang = async () => {
          return await getRepoLang(splitRepo[3], splitRepo[4]).then((data) => {
            return data;
          });
        };
        repoLang().then((data) => {
          const langs = [];
          for (let key in data) {
            langs.push(key);
          }
          const newRepo = new Repo({
            task: `${res[i].title}`,
            description: `${res[i].body}`,
            user: `${res[i].user.login}`,
            language: `${langs.join(", ")}`,
            url: `${res[i].html_url}`,
          });
          newRepo.save();
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Language of Repo
const getRepoLang = async (login, id) => {
  const config = {
    method: "get",
    url: `https://api.github.com/repos/${login}/${id}/languages`,
    auth: {
      username: "token",
      password: api_token,
    },
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  };
  return await axios(config)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete all repos
const deleteRepo = async () => {
  await Repo.deleteMany({});
};

searchForRepos();

module.exports = { searchForRepos, deleteRepo };
