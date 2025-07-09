const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: "Please check password", error: true });
    }

    const tokenData = { id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
      expiresIn: "1d",
    });

    // Correct cookie options
   

    console.log("✅ JWT Token generated:", token);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successfully",
        success: true,
        token,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profile_pic: user.profile_pic,
        },
      });

  } catch (error) {
    console.error("🔥 Error during login:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
