const request = require("supertest");
const app = require("../src/app");

describe("Administração", () => {
  let tokenAdmin;
  let tokenAluno;

  test("ADMIN deve conseguir fazer login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@aprendermais.com",
        senha: "123456"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();

    tokenAdmin = response.body.token;
  });

  test("ADMIN deve acessar dashboard administrativo", async () => {
    const response = await request(app)
      .get("/api/admin/dashboard")
      .set(
        "Authorization",
        `Bearer ${tokenAdmin}`
      );

    expect(response.statusCode).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(
      response.body.dashboard
    ).toBeDefined();
  });

  test("ADMIN deve listar usuários", async () => {
    const response = await request(app)
      .get("/api/admin/usuarios")
      .set(
        "Authorization",
        `Bearer ${tokenAdmin}`
      );

    expect(response.statusCode).toBe(200);
    expect(
      Array.isArray(response.body.usuarios)
    ).toBe(true);
  });

  test("rota administrativa deve bloquear acesso sem token", async () => {
    const response = await request(app)
      .get("/api/admin/dashboard");

    expect(response.statusCode).toBe(401);
  });

  test("ALUNO não deve acessar administração", async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "aluno@aprendermais.com",
        senha: "123456"
      });

    tokenAluno = login.body.token;

    const response = await request(app)
      .get("/api/admin/dashboard")
      .set(
        "Authorization",
        `Bearer ${tokenAluno}`
      );

    expect(response.statusCode).toBe(403);
  });
});