import { User } from '../../models/index.js';

/**
 * Fetch all users
 */
const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ data: users, message: "Successfully fetched users." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error while fetching users.' });
  }
};

/**
 * Create a new user
 */
const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: "Name, email, and password are required." });
    }

    const user = await User.create({ name, email, password });

    res.status(201).send({ data: user, message: "User created successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error while creating user.' });
  }
};

/**
 * Update existing user
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    res.status(200).send({ data: user, message: "User updated successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error while updating user.' });
  }
};

/**
 * Delete user by ID
 */
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    await user.destroy();

    res.status(200).send({ message: "User deleted successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error while deleting user.' });
  }
};

/**
 * Fetch user by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ data: user, message: "User fetched successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error while fetching user.' });
  }
};

export const userController = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};
