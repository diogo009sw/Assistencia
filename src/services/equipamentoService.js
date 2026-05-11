import {
  listarEquipamentos,
  inserirEquipamento,
  atualizarEquipamento,
  excluirEquipamento,
} from "../repositories/repositoryequipamentos.js";

export async function ListarEquipamentos() {
  return await listarEquipamentos();
}

export async function InserirEquipamento(cliente_id, nome, marca, modelo, problema) {
  return await inserirEquipamento(cliente_id, nome, marca, modelo, problema);
}

export async function AtualizarEquipamento(id, cliente_id, nome, marca, modelo, problema) {
  return await atualizarEquipamento(id, cliente_id, nome, marca, modelo, problema);
}

export async function ExcluirEquipamento(id) {
  return await excluirEquipamento(id);
}