const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    trim:true
  },
  url: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true,
    index:true,
    unique: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comment"
  }]
})

module.exports = mongoose.model("article", ArticleSchema);