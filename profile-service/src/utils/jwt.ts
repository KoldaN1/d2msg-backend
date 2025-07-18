import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const verifyToken = (token: string): DecodedToken => {
  const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;

  if (!decoded.userId) {
    throw new Error("Invalid token format");
  }

  return decoded;
};

export const createJwt = (payload: DecodedToken, expiresIn = "1h"): string => {
  return jwt.sign(payload, config.jwtSecret as string, { expiresIn });
};
