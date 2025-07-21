import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      userId: string;
    };
  }
}

interface DecodedToken extends JwtPayload {
  userId: string;
}
