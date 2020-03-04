const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  comments: [{
    ref: "comment",
    type: Schema.Types.ObjectId
  }]
})

module.exports = mongoose.model("article", ArticleSchema);