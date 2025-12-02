import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const generateTokens = (user) => {
  const payload = {
    sub: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || "dev_refresh_secret",
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
};


