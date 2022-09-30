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

router.get("/allUsers", async (req,res)=> {
    try {
        const allUsers = await User.find();

        const usersNum = allUsers.length;
        res.status(200).json(usersNum);
    } catch (error) {
        res.json(error.message);
    }
})

router.get("/date", async (req, res)=> {

    try {
        const event = new Date(2022, 12, 12);
        console.log(event.toISOString());
        const usersJan = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-01-01T00:00:00.301Z"),
                $lt: new Date("2022-01-31T23:59:59.301Z"), 
            }
        }) 
        const usersFeb = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-02-01T00:00:00.301Z"),
                $lt: new Date("2022-02-29T23:59:59.301Z"), 
            }
        }) 
        const usersMar = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-03-01T00:00:00.301Z"),
                $lt: new Date("2022-03-31T23:59:59.301Z"), 
            }
        }) 
        const usersApr = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-04-01T00:00:00.301Z"),
                $lt: new Date("2022-04-30T23:59:59.301Z"), 
            }
        }) 
        const usersMay = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-05-01T00:00:00.301Z"),
                $lt: new Date("2022-05-31T23:59:59.301Z"), 
            }
        }) 
        const usersJun = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-06-01T00:00:00.301Z"),
                $lt: new Date("2022-06-30T23:59:59.301Z"), 
            }
        }) 
        const usersJul = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-07-01T00:00:00.301Z"),
                $lt: new Date("2022-07-31T23:59:59.301Z"), 
            }
        }) 
        const usersAug = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-08-01T00:00:00.301Z"),
                $lt: new Date("2022-08-31T23:59:59.301Z"), 
            }
        }) 
        const usersSep = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-09-01T00:00:00.301Z"),
                $lt: new Date("2022-09-30T23:59:59.301Z"), 
            }
        }) 
        const usersOct = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-10-01T00:00:00.301Z"),
                $lt: new Date("2022-10-31T23:59:59.301Z"), 
            }
        }) 
        const usersNov = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-11-01T00:00:00.301Z"),
                $lt: new Date("2022-11-30T23:59:59.301Z"), 
            }
        }) 
        const usersDec = await User.find({ //query today up to tonight
            createdAt: {
                $gte: new Date("2022-12-01T00:00:00.301Z"),
                $lt: new Date("2022-12-31T23:59:59.301Z"), 
            }
        }) 

        const new_users = [
            usersJan.length, 
            usersFeb.length, 
            usersMar.length,
            usersApr.length,
            usersMay.length,
            usersJun.length,
            usersJul.length,
            usersAug.length,
            usersSep.length,
            usersOct.length,
            usersNov.length,
            usersDec.length
        ]

        res.status(200).json(new_users);
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
        if(user.rated === null){
            res.status(200).json("Nothing rated yet")
        }else{
            res.status(200).json({rated: user.rated});
        }
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;