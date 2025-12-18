import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usuariosRoutes from "./routes/usuarios.js";
import imoveisRoutes from "./routes/imoveis.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// rota raiz (health check)
app.get("/", (req, res) => {
  res.json({
    name: "Luanda Imóveis API",
    status: "online",
    environment: process.env.NODE_ENV,
  });
});

// REGISTRO DAS ROTAS (❗ ISSO FALTAVA)
app.use("/usuarios", usuariosRoutes);
app.use("/imoveis", imoveisRoutes);

// porta Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
