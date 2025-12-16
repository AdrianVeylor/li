import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Luanda Imóveis API",
    status: "online",
    environment: process.env.NODE_ENV || "local"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Luanda Imóveis rodando na porta ${PORT}`);
});
