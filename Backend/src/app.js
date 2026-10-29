const express = require("express");
const cors = require("cors");

const databaseRoutes = require("./routes/databaseRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const accessRoutes = require("./routes/accessRoutes");
const progressoRoutes = require("./routes/progressoRoutes");
const conteudoRoutes = require("./routes/conteudoRoutes");
const atividadeRoutes = require("./routes/atividadeRoutes");
const dashboardRoutes = require ("./routes/dashboardRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger");
const adminRoutes = require("./routes/adminRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use("/api/dashboard", dashboardRoutes );

app.use(cors({
  origin: 'http://localhost:5173', // Permite apenas o seu frontend Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json());

//swaggwedocument
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// ==============================
// PRINCIPAL
// ==============================

app.get("/", (req, res) => {
    res.json({
        sucesso: true,
        projeto: "Aprender+ API",
        versao: "2.0.0",
        mensagem: "API funcionando"
    });
});


// ==============================
// HEALTH
// ==============================

app.get("/api/health", (req, res) => {
    res.json({
        sucesso: true,
        status: "online",
        timestamp: new Date().toISOString()
    });
});


// ==============================
// DATABASE
// ==============================

app.use("/api/database", databaseRoutes);


// ==============================
// AUTENTICAÇÃO
// ==============================

app.use("/api/auth", authRoutes);


// ==============================
// USUÁRIOS
// ==============================

app.use("/api/users", userRoutes);

//CONTEUDO E ATIVIDADES

app.use("/api/conteudos", conteudoRoutes);
app.use("/api/atividades", atividadeRoutes);
 
//PROGRESSO

app.use("/api/progresso", progressoRoutes);

//Dashboard



// ==============================
// CONTROLE DE ACESSO
// ==============================

app.use("/api/access", accessRoutes);

//admin rota

app.use("/api/admin",adminRoutes);


// ==============================
// 404
// ==============================

app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        erro: "Rota não encontrada.",
        rota: req.originalUrl
    });
});

app.use(errorMiddleware);

module.exports = app;