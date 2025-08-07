const express = require('express');
const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ success: false, message: "🚫 Not Authorized. Token missing or malformed." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
       req.userId = decoded.id;
      next();
    } else {
      return res.status(403).json({ success: false, message: "❌ Token is invalid." });
    }
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized. Token verification failed." });
  }
};

module.exports = userAuth;
