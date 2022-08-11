const router = require("express").Router();
const Pin = require("../models/Pin");

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

module.exports = router;