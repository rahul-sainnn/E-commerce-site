const express = require('express');
const router = express.Router();
const User = require('../model/auth.model');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        console.log('Login successful');
        res.send({ message: 'Login Successfully', user: user });
      } else {
        res.send({ message: 'Invalid Password' });
      }
    } else {
      res.send({ message: 'User Not Registered' });
    }
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send({ message: 'User Already Registered' });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.send({ message: 'Successfully Registered' });
    }
  } catch (error) {
    console.error('Error in registration:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

//  ------------ get data of user by admin controller-----------
router.get('/getuser', async (req, res) => {
  try {
    const data = await User.find({}).lean().exec();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

//  ------------delete user by admin controller-----------
router.delete('/:id', async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send("User deleted");
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
