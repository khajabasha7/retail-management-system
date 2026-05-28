// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");

// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(400).json({ message: "User not found" });
// //     }

// //     // NOTE: if you use bcrypt, compare password properly
// //     const isMatch = password === user.password;

// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     const token = jwt.sign(
// //       {
// //         id: user._id,
// //         role: user.role,
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     // ⭐ IMPORTANT FIX FOR FRONTEND
// //     res.json({
// //       message: "Login successful",
// //       token,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,   // 👈 THIS IS REQUIRED
// //       },
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const router = express.Router();


// // REGISTER USER
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.json({ message: "User created", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// // LOGIN USER
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
//   const authMiddleware = require("../middleware/authMiddleware");

// router.get("/users", authMiddleware, async (req, res) => {

//   try {

//     const users = await User.find().select("-password");

//     res.json(users);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// });

// module.exports = router;
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      message: "User created",
      user,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// ================= GET USERS =================

router.get("/users", authMiddleware, async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;