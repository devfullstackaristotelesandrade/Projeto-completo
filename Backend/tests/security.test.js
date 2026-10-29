const request = require("supertest");
const app = require("../src/app");

describe("Segurança", () => {
  test("rota protegida sem token deve retornar 401", async () => {
    const response = await request(app)
      .get("/api/users/me");

    expect(response.statusCode).toBe(401);
  });

  test("token inválido deve retornar 401", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", "Bearer token-invalido");

    expect(response.statusCode).toBe(401);
  });

  test("conteúdos sem token devem retornar 401", async () => {
    const response = await request(app)
      .get("/api/conteudos");

    expect(response.statusCode).toBe(401);
  });

  test("atividades sem token devem retornar 401", async () => {
    const response = await request(app)
      .get("/api/atividades");

    expect(response.statusCode).toBe(401);
  });
});