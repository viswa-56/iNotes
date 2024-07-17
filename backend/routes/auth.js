const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const JWT_secret = "bajji"

//create user end point authentication /api/auth/createuser
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        try {
            let user = await User.collection.findOne({ "email": req.body.email });
            if (user) {
                return res.status(400).json({success, error: "user with this email exists" })
            }
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass
            })
            // .then(user => res.json(user))
            // .catch((error) =>{console.log(error)
            const data = {
                user: {
                    id: user._id
                }
            }
            const auth_token = JWT.sign(data, JWT_secret);
            // console.log(jwt_data)
            success = true
            res.json({success,auth_token})
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("some error occurred");
        }
        // res.send(req.body);
    })

router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false
        if (!errors.isEmpty()) {
            return res.status(400).json({ success,errors: errors.array() });
        }
        const { email, password } = req.body;
        // console.log(email)
        try {
            let user = await User.collection.findOne({ "email": email });
            // console.log(user)
            if (!user) {
                return res.status(400).json({success, error: "please enter correct credentials" });
            }
            // console.log(user.password)
            const passcompare = await bcrypt.compare(password, user.password);
            if (!passcompare) {
                return res.status(400).json({ success,error: "please enter correct credentials" });
            }
            const data = {
                user: {
                    id: user._id
                }
            };
            // console.log(user._id)
            // console.log(data)
            const auth_token = JWT.sign(data, JWT_secret);
            success = true
            res.json({success,auth_token})
        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal server error occurred");
        }
    })

router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id
        console.log(req.user.id)
        const user = await User.findById(userid).select("-password")
        res.send(user)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error occurred");
    }

})


module.exports = router