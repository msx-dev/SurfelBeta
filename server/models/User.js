const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 2,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 8,
        },
        
        rated: [{
            type: String,
        }], 
        avatar: {
            type: Number
        },
        user_type: {
            type: String,
            default: "user"
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);