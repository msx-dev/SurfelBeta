const router = require("express").Router();
const Pin = require("../models/Pin");
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

module.exports = router;