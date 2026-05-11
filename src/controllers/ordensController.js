import * as ordemService from "../services/ordemService.js";

export const criar = async (req, res) => {
  try {
    const id = await ordemService.criarOrdem(req.body);
    res.status(201).json({ id, mensagem: "OS criada com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

export const listar = async (req, res) => {
  const ordens = await ordemService.listarOrdens();
  res.json(ordens);
};

export const buscar = async (req, res) => {
  const ordem = await ordemService.buscarOrdem(req.params.id);
  res.json(ordem);
};

export const atualizar = async (req, res) => {
  await ordemService.atualizarOrdem(req.params.id, req.body);
  res.json({ mensagem: "OS atualizada" });
};

export const excluir = async (req, res) => {
  await ordemService.excluirOrdem(req.params.id);
  res.json({ mensagem: "OS excluída" });
};