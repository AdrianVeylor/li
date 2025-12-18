import express from "express";
import prisma from "../lib/prisma.js";
import { authMiddleware } from "../lib/protect.js";

const router = express.Router();

// Criar imóvel (PROTEGIDO)
router.post("/", authMiddleware, async (req, res) => {
  const data = {
    ...req.body,
    usuarioId: req.user.id,
  };

  try {
    const imovel = await prisma.imovel.create({ data });
    res.json(imovel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar imóveis (PÚBLICO)
router.get("/", async (req, res) => {
  const imoveis = await prisma.imovel.findMany({
    include: { usuario: true },
  });
  res.json(imoveis);
});

export default router;
