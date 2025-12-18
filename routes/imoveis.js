import express from "express";
import prisma from "../lib/prisma.js";
import { authMiddleware } from "../lib/protect.js";

const router = express.Router();

// ==============================
// Criar imóvel (PROTEGIDO)
// ==============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const data = {
      ...req.body,
      usuarioId: req.user.id,
    };

    const imovel = await prisma.imovel.create({ data });
    res.status(201).json(imovel);
  } catch (err) {
    console.error("Erro ao criar imóvel:", err);
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Listar imóveis (PÚBLICO)
// ==============================
router.get("/", async (req, res) => {
  try {
    const imoveis = await prisma.imovel.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    res.json(imoveis);
  } catch (err) {
    console.error("Erro ao listar imóveis:", err);
    res.status(500).json({
      error: "Erro ao listar imóveis",
      details: err.message,
    });
  }
});

export default router;
