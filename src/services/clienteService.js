import {
  listarClientes,
  inserirCliente,
  atualizarCliente,
  excluirCliente,
} from "../repositories/repositoryclientes.js";

export async function Listar() {
  return await listarClientes();
}

export async function Inserir(nome, email, senha) {
  return await inserirCliente(nome, email, senha);
}

export async function Atualizar(id, nome, email, senha) {
  return await atualizarCliente(id, nome, email, senha);
}

export async function Excluir(id) {
  return await excluirCliente(id);
}