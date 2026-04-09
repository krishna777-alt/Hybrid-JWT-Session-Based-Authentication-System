import jwt from "jsonwebtoken";

export const generateAccessToken = function (user) {
  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    },
  );
  return accessToken;
};

export const generateRefreshToken = function (user) {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES },
  );

  return refreshToken;
};
