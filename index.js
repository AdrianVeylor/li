import express from "express";
import cors from "cors";
import "dotenv/config";

import imoveisRoutes from "./routes/imoveis.js";
import usuariosRoutes from "./routes/usuarios.js";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota raiz (health check)
app.get("/", (req, res) => {
  res.json({
    name: "Luanda Imóveis API",
    status: "online",
    environment: process.env.NODE_ENV,
  });
});

// 🔗 REGISTO DAS ROTAS
app.use("/imoveis", imoveisRoutes);
app.use("/usuarios", usuariosRoutes);

// Porta Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Luanda Imóveis rodando na porta ${PORT}`);
});
