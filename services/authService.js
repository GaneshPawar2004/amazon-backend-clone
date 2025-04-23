import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { generateToken } from '../utils/index.js';

export const registerUser = async (name, email, password, isAdmin = false) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, isAdmin, });
  const token = generateToken(user._id);

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }, token
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken(user._id);
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }, token
  };
};

// Update user profile
export const updateUserProfile = async (userId, { name, email, password }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) {
    user.password = await bcrypt.hash(password, 10);  // Hash password before saving
  }

  await user.save();
  return user;
};

// Admin can update any user
export const updateUserService = async (userId, { name, email, isAdmin }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (name) user.name = name;
  if (email) user.email = email;
  if (typeof isAdmin !== 'undefined') user.isAdmin = isAdmin;

  await user.save();
  return user;
};

// Admin can delete any user
export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  await user.deleteOne(); // ✅ Correct
};