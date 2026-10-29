const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Aprender+ API",
      version: "2.0.0",
      description:
        "API educacional do projeto Aprender+ - ODS 4 Educação de Qualidade"
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        Login: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: {
              type: "string",
              example: "aluno@aprendermais.com"
            },
            senha: {
              type: "string",
              example: "123456"
            }
          }
        },

        Conteudo: {
          type: "object",
          required: [
            "titulo",
            "descricao",
            "disciplina",
            "nivel"
          ],
          properties: {
            titulo: {
              type: "string",
              example: "Alfabetização Básica"
            },
            descricao: {
              type: "string",
              example: "Introdução à leitura e escrita."
            },
            disciplina: {
              type: "string",
              example: "Português"
            },
            nivel: {
              type: "string",
              example: "Fundamental"
            }
          }
        },

        Atividade: {
          type: "object",
          required: [
            "conteudoId",
            "pergunta",
            "resposta",
            "dificuldade"
          ],
          properties: {
            conteudoId: {
              type: "integer",
              example: 1
            },
            pergunta: {
              type: "string",
              example: "Qual é a primeira letra de CASA?"
            },
            resposta: {
              type: "string",
              example: "C"
            },
            dificuldade: {
              type: "string",
              example: "Fácil"
            }
          }
        },

        Progresso: {
          type: "object",
          required: ["atividadeId", "resposta"],
          properties: {
            atividadeId: {
              type: "integer",
              example: 1
            },
            resposta: {
              type: "string",
              example: "C"
            }
          }
        }
      }
    },

    tags: [
      { name: "Sistema" },
      { name: "Autenticação" },
      { name: "Usuários" },
      { name: "Conteúdos" },
      { name: "Atividades" },
      { name: "Progresso" },
      { name: "Dashboard" }
    ],

    paths: {
      "/": {
        get: {
          tags: ["Sistema"],
          summary: "Informações da API",
          responses: {
            200: {
              description: "API funcionando"
            }
          }
        }
      },

      "/api/health": {
        get: {
          tags: ["Sistema"],
          summary: "Verifica saúde da API",
          responses: {
            200: {
              description: "API online"
            }
          }
        }
      },

      "/api/auth/register": {
        post: {
          tags: ["Autenticação"],
          summary: "Cadastrar usuário",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["nome", "email", "senha"],
                  properties: {
                    nome: { type: "string", example: "João Silva" },
                    email: {
                      type: "string",
                      example: "joao@email.com"
                    },
                    senha: {
                      type: "string",
                      example: "123456"
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Usuário criado" },
            409: { description: "E-mail já cadastrado" }
          }
        }
      },

      "/api/auth/login": {
        post: {
          tags: ["Autenticação"],
          summary: "Realizar login",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Login"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Login realizado"
            },
            401: {
              description: "Credenciais inválidas"
            }
          }
        }
      },

      "/api/users/me": {
        get: {
          tags: ["Usuários"],
          summary: "Consultar usuário autenticado",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Usuário encontrado" },
            401: { description: "Não autenticado" }
          }
        }
      },

      "/api/conteudos": {
        get: {
          tags: ["Conteúdos"],
          summary: "Listar conteúdos",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Lista de conteúdos" }
          }
        },

        post: {
          tags: ["Conteúdos"],
          summary: "Criar conteúdo",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Conteudo"
                }
              }
            }
          },
          responses: {
            201: { description: "Conteúdo criado" },
            403: { description: "Acesso negado" }
          }
        }
      },

      "/api/conteudos/{id}": {
        get: {
          tags: ["Conteúdos"],
          summary: "Buscar conteúdo",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: { description: "Conteúdo encontrado" },
            404: { description: "Não encontrado" }
          }
        },

        put: {
          tags: ["Conteúdos"],
          summary: "Atualizar conteúdo",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Conteudo"
                }
              }
            }
          },
          responses: {
            200: { description: "Conteúdo atualizado" }
          }
        },

        delete: {
          tags: ["Conteúdos"],
          summary: "Excluir conteúdo",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: { description: "Conteúdo excluído" },
            403: { description: "Acesso negado" }
          }
        }
      },

      "/api/atividades": {
        get: {
          tags: ["Atividades"],
          summary: "Listar atividades",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Lista de atividades" }
          }
        },

        post: {
          tags: ["Atividades"],
          summary: "Criar atividade",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Atividade"
                }
              }
            }
          },
          responses: {
            201: { description: "Atividade criada" }
          }
        }
      },

      "/api/atividades/{id}": {
        get: {
          tags: ["Atividades"],
          summary: "Buscar atividade",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: { description: "Atividade encontrada" }
          }
        },

        put: {
          tags: ["Atividades"],
          summary: "Atualizar atividade",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: { description: "Atividade atualizada" }
          }
        },

        delete: {
          tags: ["Atividades"],
          summary: "Excluir atividade",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            200: { description: "Atividade excluída" }
          }
        }
      },

      "/api/progresso": {
        post: {
          tags: ["Progresso"],
          summary: "Registrar resposta",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Progresso"
                }
              }
            }
          },
          responses: {
            201: { description: "Resposta registrada" },
            403: { description: "Acesso negado" }
          }
        }
      },

      "/api/progresso/me": {
        get: {
          tags: ["Progresso"],
          summary: "Consultar meu progresso",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Progresso do aluno" }
          }
        }
      },

      "/api/dashboard": {
        get: {
          tags: ["Dashboard"],
          summary: "Dashboard do aluno",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Dashboard carregado" }
          }
        }
      }
    }
  },

  apis: []
};

module.exports = swaggerJsdoc(options);