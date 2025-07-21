import supertest from "supertest";
import { createFastify } from "../src/server/fastify";

describe("Fastify server", () => {
  let fastify: ReturnType<typeof createFastify>;

  beforeAll(async () => {
    fastify = createFastify();
    fastify.get("/ping", async (request, reply) => {
      return { pong: true };
    });
    await fastify.listen({ port: 0 });
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("GET /ping should return pong", async () => {
    const response = await supertest(fastify.server).get("/ping");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ pong: true });
  });
});
