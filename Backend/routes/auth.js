const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "montea@123";

// ROUTE 1 :  create a user using: POST "/api/auth/createuser". Doesn't require Authentication

router.post('/createuser', [
    body('name', 'Enter a valiad name ').isLength({ min: 3 }), // Fix typo here
    body('email', 'Enter a valiad email').isEmail(), // Use isEmail() to validate email
    body('password', 'Enter must 5 character').isLength({ min: 5 }), // Fix typo here
], async (req, res) => {
    let success = false;
    // if there are error return bad request     
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }); // Change 'result' to 'errors' for clarity
    }

    // check if email is exixte already

    try {



        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({success ,  error: "sorry a user with this email alreadt exist" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success ,  authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server errror")
    }


});



// ROUTE 2:  authentication using: POST "/api/auth/login". Doesn't require Authentication

router.post('/login', [
    body('email', 'Enter a valiad email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // if there are error return bad request     
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }); // Change 'result' to 'errors' for clarity
    }

    const { email, password } = req.body;

    try {
        let  user = await User.findOne({ email });
        if (!user) {
            success = false; 
            return res.status(400).json({success ,  error: "Enter correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false; 
            return res.status(400).json({success ,error: "Enter correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success ,authtoken })
         
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server errror")
    }

})


// ROUTE 3 : get user  using detail : POST "/api/auth/getuser ". require Authentication

router.post('/getuser',fetchuser ,  async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)


} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server errror")
}
})

module.exports = router;

