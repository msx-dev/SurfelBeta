const router = require("express").Router();
const Pin = require("../models/Pin");
const User = require("../models/User");
const mongoose = require("mongoose");


//Create a new Pin
router.post("/", async (req, res)=> {
    const pin = new Pin(req.body);

    const user_id = req.body.user_id;
   
    try {
        const savedPin = await pin.save();
        const newPinID = savedPin._id.toString();

        await User.findByIdAndUpdate(user_id,{
            $addToSet: {
                rated: [newPinID]
            }
        })

        

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
        let ratings = sum/all_ratings;
        ratings = Math.round(ratings * 10) / 10;
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

router.get("/date", async (req, res)=> {
    try {
        const event = new Date(2022, 12, 12);
        console.log(event.toISOString());
        const users = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date(2022, 4, 13),
                $lt: new Date(2022, 12, 12), 
            }
        }) 

        res.status(200).json(users);
    } catch (error) {
        res.json(error.message);
    }
})

router.post("/nearby", async (req, res)=> {
    try {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

        console.log(req.body)

        const latitudeMin = latitude - 0.2;
        const latitudeMax = latitude + 0.2;

        const longitudeMin = longitude - 0.2;
        const longitudeMax = longitude + 0.2;

        
        const pins = await Pin.find({ 
            lat: {
                $gt: latitudeMin,
                $lt: latitudeMax
            }, 
            long: {
                $gt: longitudeMin,
                $lt: longitudeMax
            }
        });

        res.status(200).json(pins);
    } catch (error) {
        res.json(error.message);
    }
})



module.exports = router;