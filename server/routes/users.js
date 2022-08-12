const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Registration
router.post("/register", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        const saltRounds = await bcrypt.genSalt(12);
        const cryptPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            email: email,
            password: cryptPassword,
        })



        const userSave = await newUser.save();
        res.json(userSave);
        
    } catch (error) {
        res.json(error.message);
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({username:username});

        

        //Compare passwords
        const validatePassword = await bcrypt.compare(
            password,
            user.password
        );
        
        if(!user){
            res.status(400).json("Username or Password not correct!")
        }else if(!validatePassword){
            res.status(400).json("Username or Password not correct!")
        }else{
            res.status(200).json({_id:user._id, username: user.username});
        }
        
    } catch (error) {
        res.json(error.message);
    }
})

router.get("/date", async (req, res)=> {
    try {
        const event = new Date(2022, 12, 12);
        console.log(event.toISOString());
        const users = await User.find({ //query today up to tonight
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

module.exports = router;