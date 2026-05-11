import * as serviceCliente from "../services/serviceclientes.js"; // ✅ corrigido

async function Listar(req, res) {
  try {
    const clientes = await serviceCliente.Listar();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: "Não foi possível listar os clientes" });
  }
}

async function Inserir(req, res) {
  try {
    const { nome, cpf_cnpj, telefone, email, endereco } = req.body;
    const cliente = await serviceCliente.Inserir(nome, cpf_cnpj, telefone, email, endereco);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ erro: "Não foi possível inserir o cliente" });
  }
}

async function Editar(req, res) {
  try {
    const { id } = req.params;
    const { nome, cpf_cnpj, telefone, email, endereco } = req.body;
    const cliente = await serviceCliente.Editar(id, nome, cpf_cnpj, telefone, email, endereco);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ erro: "Não foi possível editar o cliente" });
  }
}

async function Excluir(req, res) {
  try {
    const { id } = req.params;
    const cliente = await serviceCliente.Excluir(id);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ erro: "Não foi possível excluir o cliente" });
  }
}

export { Listar, Inserir, Editar, Excluir };