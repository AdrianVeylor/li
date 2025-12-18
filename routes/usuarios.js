import express from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { gerarToken } from "../lib/auth.js";

const router = express.Router();

// REGISTRO
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: hash },
    });

    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const valido = await bcrypt.compare(senha, usuario.senha);

  if (!valido) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = gerarToken(usuario);

  res.json({
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
  });
});

// LISTAR USUÁRIOS
router.get("/", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

export default router;
