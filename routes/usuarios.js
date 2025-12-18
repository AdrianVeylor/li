import express from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * REGISTRO
 * POST /usuarios/register
 */
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Dados obrigatórios em falta" });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });

    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  } catch (err) {
    res.status(400).json({ error: "Email já registado" });
  }
});

/**
 * LOGIN
 * POST /usuarios/login
 */
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

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

export default router;
