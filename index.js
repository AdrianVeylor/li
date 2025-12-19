import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js";
import imoveisRoutes from "./routes/imoveis.js";

const app = express();

/**
 * CORS — NECESSÁRIO PARA O BROWSER (Next.js)
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://li-production-230d.up.railway.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Luanda Imóveis API",
    status: "online",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/usuarios", usuariosRoutes);
app.use("/imoveis", imoveisRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
