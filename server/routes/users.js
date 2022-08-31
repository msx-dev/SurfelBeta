const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Registration
router.post("/register", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const user_type = req.body.user_type;
        
        


        const saltRounds = await bcrypt.genSalt(12);
        const cryptPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            email: email,
            password: cryptPassword,
            user_type: user_type
        })



        const userSave = await newUser.save();
        res.status(200).json("Success!");
        
    } catch (error) {
        res.status(400).json("Something went wrong!");
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
            res.status(200).json({_id:user._id, username: user.username, avatar: user.avatar, user_type: user.user_type});
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

router.post("/avatar", async (req, res)=> {
    try {
        const username = req.body.username;
        const user = await User.findOne({username: username});
        const avatar = req.body.avatar;

        await User.findOneAndUpdate({username:username}, {avatar: avatar});
        res.status(200).json("Avatar added!");
    } catch (error) {
        
    }
})

router.post("/ratedPosts", async (req, res)=> {
    try {
        const user_id = req.body.user_id;
        const user = await User.findById(user_id);
        res.status(200).json({rated: user.rated});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;