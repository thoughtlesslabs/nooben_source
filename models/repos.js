const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repoSchema = new Schema(
  {
    task: String,
    description: String,
    user: String,
    language: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repositories", repoSchema);
