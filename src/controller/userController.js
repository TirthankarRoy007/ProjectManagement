const User = require('../model/userModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).send({ status: false, message: 'Name and email are required fields.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ status: false, message: 'User with this email already exists.' });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    return res.status(201).send(newUser);
  } catch (error) {
    return res.status(500).send({ status: false, message: 'Server error. Failed to create a new user.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ status: false, message: "Error fetching users", error });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ status: false, message: 'User not found' });
    }

    return res.send(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};