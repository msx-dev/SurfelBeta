const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
          min: 3,
          max: 60,
        },
        description: {
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
        long: {
          type: Number,
          required: true,
        },
        lat: {
          type: Number,
          required: true,
        },
        username: {
          type: String,
          required: true,
        }
        /* 
        all_ratings: {
          type: Number,
          required: true,
        },
        all_ratings_sum: {
          type: Number,
          required: true,
        },
        forecastID: {
          type: Number
        }
        */
      },
    {timestamps: true}
);

module.exports = mongoose.model("Pin", PinSchema);