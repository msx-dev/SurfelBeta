const router = require("express").Router();
const Pin = require("../models/Pin");
const User = require("../models/User");
const mongoose = require("mongoose");


//Create a new Pin
router.post("/", async (req, res)=> {
    const pin = new Pin(req.body);
    try {
        const savedPin = await pin.save();
        res.status(200).json(savedPin);
    } catch (error) {
        res.json(error.message);
    }
})

//Get all Pins
router.get("/", async (req, res) => {
    try {
        const allPins = await Pin.find();
        res.status(200).json(allPins);
    } catch (error) {
        res.json(error.message);
    }
})

//First get by id and then update
//Get new rating from req.body => add +1 to ratings and sum_ratings+=1, then divide and update
router.post("/update", async (req, res) => {
    const id = req.body.id;
    
    try {
        /*Pin.updateOne({_id: id}, {
            $set: {
                rating: 2,
            }
        }) */
        await Pin.findByIdAndUpdate(id,
            {
                rating: 1,
            });
        res.status(200).json("Success!");
    } catch (error) {
        res.json(error.message);
    }
})

router.post("/rate", async (req, res)=> {
    const id = req.body.id;
    const rating = req.body.rating;
    const user_id = req.body.user_id;
    try {
        const pin = await Pin.findById(id);
        //Get number of all ratings of this pin and add one new rating
        all_ratings = pin.all_ratings + 1;
        //Get sum of actual ratings and add new rating to the sum
        sum = pin.all_ratings_sum + rating;
        const ratings = sum/all_ratings;
        await Pin.findByIdAndUpdate(id,
            {
                rating: ratings,
                all_ratings_sum: sum,
                all_ratings: all_ratings
            });
        await User.findByIdAndUpdate(user_id,{
            $addToSet: {
                rated: [id]
            }
        })
        
        res.status(200).json("Success!");
    } catch (error) {
        res.json(error);
    }
    
})



module.exports = router;