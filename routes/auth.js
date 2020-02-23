const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

//@route  GET api/auth
//@desc   Get current logged in user
//@access private
router.get('/', auth, async (req, res) => {
  //get the user from DB
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error...' });
  }
});

//@route  POST api/auth
//@desc   Auth user and get token
//@access public
//Auth user and get token - login user
router.post(
  '/',
  [
    check('email', 'Please include valid email...').isEmail(),
    check('password', 'Password is required...')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //get email, password out of the body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials...' });
      }

      //if there is a valid user with email address provided
      //check the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials...' });
      }

      //if both match, valid user return the token
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.err(err.message);
      res.status(500).send('Server Error...');
    }
  }
);

module.exports = router;
