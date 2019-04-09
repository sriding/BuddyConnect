const mongoose = require("mongoose");
const commentsSchema = require("./comments");
const profileSchema = require("./profiles");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  datePosted: { type: Date, default: Date.now(), required: true },
  p_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: profileSchema,
    required: true
  },
  name: {type: String, required: true},
  avatar: {type: String, default: "Standard", required: true},
  post: { type: String, default: "Initial Post. Ignore.", required: true },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: commentsSchema,
      required: false
    }
  ],
  addComment: { type: Boolean, default: false, required: true }
});

const posts = mongoose.model("post", PostSchema);

module.exports = posts;