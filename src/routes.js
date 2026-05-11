import express from "express";
import * as service from "../services/serviceclientes.js";
import ordensRoutes from "./routes/ordensRoutes.js";

app.use(ordensRoutes);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dados = await service.Listar();
    res.json(dados);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar clientes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, cpf_cnpj, telefone, email, endereco } = req.body;
    const novo = await service.Inserir(nome, cpf_cnpj, telefone, email, endereco);
    res.json(novo);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao inserir cliente" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.Excluir(id);
    res.json(result);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao excluir cliente" });
  }
});

export default router;