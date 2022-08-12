const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        comment: {
          type: String,
          required: true,
          min: 3,
          max: 60,
        },
        username: {
          type: String,
          required: true,
          min: 3,
        },
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
        },
        pinID: {
            type: String
        }
        
      },
    {timestamps: true}
);

module.exports = mongoose.model("Comment", CommentSchema);