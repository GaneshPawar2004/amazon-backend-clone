import { registerUser, loginUser } from '../services/index.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { user, token } = await registerUser(name, email, password);
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
