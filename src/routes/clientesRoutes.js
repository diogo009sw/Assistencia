import express from "express";
import * as service from "../services/serviceclientes.js";

const router = express.Router();

// Listar clientes
router.get("/", async (req, res) => {
  try {
    const dados = await service.Listar();
    res.json(dados);
  } catch (erro) {
    console.error("Erro real:", erro);
    res.status(500).json({ erro: erro.message });
  }
});

// Inserir cliente
router.post("/", async (req, res) => {
  try {
    const { nome, cpf_cnpj, telefone, email, endereco } = req.body;
    const novo = await service.Inserir(nome, cpf_cnpj, telefone, email, endereco);
    res.json(novo);
  } catch (erro) {
    console.error("Erro real:", erro);
    res.status(500).json({ erro: erro.message });
  }
});

// Excluir cliente
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.Excluir(id);
    res.json(result);
  } catch (erro) {
    console.error("Erro real:", erro);
    res.status(500).json({ erro: erro.message });
  }
});

export default router;