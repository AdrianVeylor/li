import express from "express";
import cors from "cors";
import "dotenv/config";

import usuariosRoutes from "./routes/usuarios.js";
import imoveisRoutes from "./routes/imoveis.js";

const app = express();

app.use(cors());
app.use(express.json());

// rota de saúde (IMPORTANTE)
app.get("/", (req, res) => {
  res.json({
    name: "Luanda Imóveis API",
    status: "online",
    environment: process.env.NODE_ENV,
  });
});

app.use("/usuarios", usuariosRoutes);
app.use("/imoveis", imoveisRoutes);

// 🚨 PORTA CORRETA PARA RAILWAY
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
