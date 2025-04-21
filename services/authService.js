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
