import jwt from "jsonwebtoken";
import { verifyToken } from "../src/utils/jwt";
import { config } from "../src/config";

jest.mock("../src/config", () => ({
  config: { jwtSecret: "testsecret" },
}));

describe("verifyToken", () => {
  it("decodes and returns a valid token", () => {
    const payload = { userId: "123" };
    const token = jwt.sign(payload, config.jwtSecret);

    const result = verifyToken(token);
    expect(result.userId).toBe("123");
  });

  it("throws an error if the token is invalid", () => {
    const token = jwt.sign({}, config.jwtSecret);

    expect(() => verifyToken(token)).toThrow("Invalid token format");
  });

  it("throws an error if the token is missing", () => {
    expect(() => verifyToken("invalid.token.here")).toThrow();
  });
});
