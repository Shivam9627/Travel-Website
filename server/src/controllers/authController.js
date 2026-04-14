import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = () => process.env.JWT_SECRET || "dev-mock-secret";
const mockUserId = () => "507f1f77bcf86cd799439011";

const register = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  if (globalThis.__MOCK_DB__) {
    return res.status(201).json({
      message: "Registered (demo mode). You can sign in with any email/password.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName: firstName || username,
      lastName: lastName || "Traveler",
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: String(error) });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (globalThis.__MOCK_DB__) {
    const token = jwt.sign({ id: mockUserId() }, jwtSecret(), {
      expiresIn: "7d",
    });
    return res.status(200).json({
      token,
      user: {
        id: mockUserId(),
        username: "Demo",
        email: email || "explorer@novanectra.travel",
      },
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret(), {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: String(error) });
  }
};

const getProfile = async (req, res) => {
  if (globalThis.__MOCK_DB__) {
    return res.status(200).json({
      _id: mockUserId(),
      username: "Demo",
      email: "explorer@novanectra.travel",
      firstName: "Demo",
      lastName: "Traveler",
    });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error: String(error) });
  }
};

export { register, login, getProfile };
