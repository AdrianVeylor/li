import express from "express";
import usuariosRoutes from "./routes/usuarios.js";
import imoveisRoutes from "./routes/imoveis.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Luanda Imóveis API",
    status: "online",
    environment: process.env.NODE_ENV,
  });
});

app.use("/usuarios", usuariosRoutes);
app.use("/imoveis", imoveisRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
