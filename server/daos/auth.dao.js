const User = require("../models/user.model");

const registerUser = (user, salt, hash) => {
  const newUser = new User({
    userName: user.userName,
    hash,
    salt,
    role: user.role,
    name: user.name,
    contactNumber: user.contactNumber,
  });
  return newUser.save();
};

const findUserByName = (userName) => User.findOne({ userName });

const authDao = {
  registerUser,
  findUserByName,
};

module.exports = authDao;
