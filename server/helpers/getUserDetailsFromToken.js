// const jwt = require('jsonwebtoken')
// const UserModel = require('../models/UserModel')

// const getUserDetailsFromToken = async(token)=>{

//     if(!token){
//         return {
//             message : "session out",
//             logout : true,
//         }
//     }

//     const decode = await jwt.verify(token,process.env.JWT_SECREAT_KEY)

//     const user = await UserModel.findById(decode.id).select('-password')

//     return user
// }

// module.exports = getUserDetailsFromToken
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const getUserDetailsFromToken = async (token) => {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    // Handle empty or malformed token
    return {
      message: "Session expired or invalid token",
      logout: true,
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }

    return user;
  } catch (error) {
    console.error("JWT verify error:", error.message);
    return {
      message: "Token invalid or expired",
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
