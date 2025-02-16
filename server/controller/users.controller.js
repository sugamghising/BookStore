import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import { z } from "zod";

// Register a new user
export const registerUser = async (req, res) => {
  const userSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  try {
    // Validate the request body using Zod
    const validatedData = userSchema.parse(req.body);

    const { name, email, password } = validatedData;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT
    const payload = { id: user.id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    // If validation fails, Zod will throw a ZodError
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }

    // General server error handling
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const payload = { id: user.id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      token,
      user: {
        // Include the user object
        id: user.id,
        name: user.name, // Include the name (and any other properties you need)
        email: user.email,
        isAdmin: user.isAdmin,
        // ... other properties you want to send
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    // Ensure the user exists
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile (excluding password)
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
