const request = require("supertest");
const app = require("../src/app");

describe("Autenticação", () => {
  const email = `teste${Date.now()}@aprendermais.com`;

  test("deve rejeitar dados inválidos", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        nome: "A",
        email: "email-invalido",
        senha: "123"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.sucesso).toBe(false);
  });

  test("deve cadastrar usuário", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        nome: "Aluno Teste",
        email,
        senha: "123456"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.sucesso).toBe(true);
  });

  test("deve realizar login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        senha: "123456"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});