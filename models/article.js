const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
  url: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comment"
  }]
})

module.exports = mongoose.model("article", ArticleSchema);