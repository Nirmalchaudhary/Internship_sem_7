const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authanticate = require('../Middleware/authanticate')

require("../DB/conn");
const User = require("../model/userSchema");

//----Home Route------

router.get("/", (req, res) => {
  res.send("hello world from server router");
});

router.get("/register", (req, res) => {
  res.send("hello world from register");
});
router.get("/signin", (req, res) => {
  res.send("hello world from signin");
});
router.get("/signup", (req, res) => {
  res.send("hello world from signin");
});

//----Register Route------

//----------using Promises----------------

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Please fill the fields properlly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(409).json({ message: "Email already exist" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfuly" });
//         })
//         .catch((err) => {
//           res.status(500).json({ error: "Faild resigester" });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//----------using async awit-------------

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the fields properlly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ message: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(409).json({ message: "Password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "user registered successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

//----Login Route------

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "Please fill the fields properlly" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (!userLogin) {
      res.status(400).json({ error: "user does not exist" });
    } else {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log("Token When Generate: ",token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Incorrect Password" });
      } else {
        res.json({ message: "user signin successfuly" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});



//about us  


router.get("/about",authanticate,(req, res) => {
  console.log("my about page");
  res.send(req.rootUser)
});

//Logout  


router.get("/logout",(req, res) => {
  console.log("my Logout page");
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send('user logout')
});

///admin

router.get("/admin",async(req, res) => {
const userData=await User.find({})
console.log(userData)
res.status(200).send(userData)
});




module.exports = router;
