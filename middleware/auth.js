const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "🚫 Not Authorized. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      req.body.userId = decoded.id; // 🛠 Make sure this matches how you're accessing it in controllers
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
