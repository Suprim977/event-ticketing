import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "No user found with this email." });
    }

    // Verify password (assumes plain text match — use bcrypt in production)
    if (user.password !== password) {
      return res.status(401).send({ message: "Incorrect password." });
    }

    // Generate access token
    const token = generateToken({ user: user.toJSON() });

    return res.status(200).send({
      data: { access_token: token },
      message: "Successfully logged in.",
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ message: "Internal server error during login." });
  }
};

const init = async (req, res) => {
  try {
    const user = req.user?.user;
    if (!user) {
      return res.status(401).send({ message: "Unauthorized access." });
    }

    delete user.password;

    res.status(200).send({
      data: user,
      message: "Successfully fetched current user details.",
    });

  } catch (error) {
    console.error("Init error:", error);
    res.status(500).send({ message: "Failed to fetch current user." });
  }
};

export const authController = {
  login,
  init,
};
