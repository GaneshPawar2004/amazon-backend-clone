import { registerUser, loginUser, updateUserProfile,/* forgotPassword,*/ updateUserService, deleteUserService } from '../services/index.js';

export const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const { user, token } = await registerUser(name, email, password, isAdmin);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginUser(email, password);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Forgot password (structure only)
export const forgotPassword = async (req, res) => {
  // Placeholder for forgot password functionality
  res.json({ message: 'Forgot password functionality is not yet implemented.' });
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await updateUserProfile(req.user._id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin can update any user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, isAdmin } = req.body;
  try {
    const updatedUser = await updateUserService(id, { name, email, isAdmin });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin can delete any user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserService(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};