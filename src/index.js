import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { Listar, Inserir, Atualizar, Excluir } from "./services/clienteService.js";
import {
  ListarEquipamentos,
  InserirEquipamento,
  AtualizarEquipamento,
  ExcluirEquipamento,
} from "./services/equipamentoService.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando" });
});

/* =========================
   CLIENTES
========================= */

app.get("/clientes", async (req, res) => {
  try {
    const clientes = await Listar();
    res.json(clientes);
  } catch (err) {
    console.error("Erro ao listar clientes:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/clientes", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: "Os campos nome, email e senha são obrigatórios",
      });
    }

    const result = await Inserir(nome, email, senha);

    res.status(201).json({
      id: result.insertId,
      nome,
      email,
      senha,
      message: "Cliente cadastrado com sucesso",
    });
  } catch (err) {
    console.error("Erro ao cadastrar cliente:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "Este email já está cadastrado",
      });
    }

    res.status(500).json({ error: err.message });
  }
});

app.put("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: "Os campos nome, email e senha são obrigatórios",
      });
    }

    const result = await Atualizar(id, nome, email, senha);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json({ message: "Cliente atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "Este email já está cadastrado",
      });
    }

    res.status(500).json({ error: err.message });
  }
});

app.delete("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Excluir(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json({ message: "Cliente excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir cliente:", err);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   EQUIPAMENTOS
========================= */

app.get("/equipamentos", async (req, res) => {
  try {
    const equipamentos = await ListarEquipamentos();
    res.json(equipamentos);
  } catch (err) {
    console.error("Erro ao listar equipamentos:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/equipamentos", async (req, res) => {
  try {
    const { cliente_id, nome, marca, modelo, problema } = req.body;

    if (!cliente_id || !nome || !marca || !modelo || !problema) {
      return res.status(400).json({
        error: "Os campos cliente_id, nome, marca, modelo e problema são obrigatórios",
      });
    }

    const result = await InserirEquipamento(cliente_id, nome, marca, modelo, problema);

    res.status(201).json({
      id: result.insertId,
      cliente_id,
      nome,
      marca,
      modelo,
      problema,
      message: "Equipamento cadastrado com sucesso",
    });
  } catch (err) {
    console.error("Erro ao cadastrar equipamento:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/equipamentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente_id, nome, marca, modelo, problema } = req.body;

    if (!cliente_id || !nome || !marca || !modelo || !problema) {
      return res.status(400).json({
        error: "Os campos cliente_id, nome, marca, modelo e problema são obrigatórios",
      });
    }

    const result = await AtualizarEquipamento(id, cliente_id, nome, marca, modelo, problema);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Equipamento não encontrado" });
    }

    res.json({ message: "Equipamento atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar equipamento:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/equipamentos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ExcluirEquipamento(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Equipamento não encontrado" });
    }

    res.json({ message: "Equipamento excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir equipamento:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});