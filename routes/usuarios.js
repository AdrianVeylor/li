import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

// Criar usuário
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar usuários
router.get("/", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

export default router;
