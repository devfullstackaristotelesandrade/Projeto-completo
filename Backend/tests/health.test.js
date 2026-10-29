const request = require("supertest");
const app = require("../src/app");

describe("Sistema", () => {
  test("GET / deve retornar sucesso", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.sucesso).toBe(true);
  });

  test("GET /api/health deve retornar online", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("online");
  });
});