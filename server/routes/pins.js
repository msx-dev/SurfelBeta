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
router.get("/allPins", async (req, res) => {
    try {
        const allPins = await Pin.find();
        const pinsNum = allPins.length;

        res.status(200).json(pinsNum);
    } catch (error) {
        res.json(error.message);
    }
})

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

router.post("/report", async (req, res)=> {
    try {
        const id = req.body.id;
        console.log(req.body);

        await Pin.findByIdAndUpdate(id,
            {
                reported: true
            });

        res.status(200).json("Success!");
    } catch (error) {
        res.json(error.message);
    }
})

router.get("/reportedPins", async (req, res)=>{
    try {
        const reported = await Pin.find({reported: {$eq: true}})

        res.status(200).json(reported)
    } catch (error) {
        res.json(error.message);
    }
})

router.post("/deletePin", async (req, res)=> {
    try {
        const id = req.body.id;
        await Pin.findByIdAndDelete(id);
        res.status(200).json("Pin deleted")
    } catch (error) {
        res.json(error.message)
    }
})

router.get("/new_date", async (req, res)=> {

    try {
        
        const pinsJan = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-01-01T00:00:00.301Z"),
                $lt: new Date("2022-01-31T23:59:59.301Z"), 
            }
        }) 
        const pinsFeb = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-02-01T00:00:00.301Z"),
                $lt: new Date("2022-02-29T23:59:59.301Z"), 
            }
        }) 
        const pinsMar = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-03-01T00:00:00.301Z"),
                $lt: new Date("2022-03-31T23:59:59.301Z"), 
            }
        }) 
        const pinsApr = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-04-01T00:00:00.301Z"),
                $lt: new Date("2022-04-30T23:59:59.301Z"), 
            }
        }) 
        const pinsMay = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-05-01T00:00:00.301Z"),
                $lt: new Date("2022-05-31T23:59:59.301Z"), 
            }
        }) 
        const pinsJun = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-06-01T00:00:00.301Z"),
                $lt: new Date("2022-06-30T23:59:59.301Z"), 
            }
        }) 
        const pinsJul = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-07-01T00:00:00.301Z"),
                $lt: new Date("2022-07-31T23:59:59.301Z"), 
            }
        }) 
        const pinsAug = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-08-01T00:00:00.301Z"),
                $lt: new Date("2022-08-31T23:59:59.301Z"), 
            }
        }) 
        const pinsSep = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-09-01T00:00:00.301Z"),
                $lt: new Date("2022-09-30T23:59:59.301Z"), 
            }
        }) 
        const pinsOct = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-10-01T00:00:00.301Z"),
                $lt: new Date("2022-10-31T23:59:59.301Z"), 
            }
        }) 
        const pinsNov = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-11-01T00:00:00.301Z"),
                $lt: new Date("2022-11-30T23:59:59.301Z"), 
            }
        }) 
        const pinsDec = await Pin.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-12-01T00:00:00.301Z"),
                $lt: new Date("2022-12-31T23:59:59.301Z"), 
            }
        }) 

        const new_pins = [
            pinsJan.length, 
            pinsFeb.length, 
            pinsMar.length,
            pinsApr.length,
            pinsMay.length,
            pinsJun.length,
            pinsJul.length,
            pinsAug.length,
            pinsSep.length,
            pinsOct.length,
            pinsNov.length,
            pinsDec.length
        ]

        res.status(200).json(new_pins);
    } catch (error) {
        res.json(error.message);
    }
})




module.exports = router;