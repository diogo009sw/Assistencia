import * as ordemRepo from "../repositories/repositoryOrdens.js";

export const criarOrdem = async (dados) => {
  if (!dados.cliente_id || !dados.equipamento_id) {
    throw new Error("Cliente e equipamento são obrigatórios");
  }

  return await ordemRepo.createOrdem(dados);
};

export const listarOrdens = () => ordemRepo.getOrdens();

export const buscarOrdem = (id) => ordemRepo.getOrdemById(id);

export const atualizarOrdem = (id, dados) =>
  ordemRepo.updateOrdem(id, dados);

export const excluirOrdem = (id) =>
  ordemRepo.deleteOrdem(id);