import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const verifyToken = (token: string): DecodedToken => {
  const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;

  if (!decoded.userId) {
    throw new Error("Invalid token format");
  }

  return decoded;
};
