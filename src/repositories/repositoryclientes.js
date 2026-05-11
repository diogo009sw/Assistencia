import db from "../config/database.js";

export async function listarClientes() {
  const [rows] = await db.query("SELECT * FROM clientes ORDER BY id DESC");
  return rows;
}

export async function inserirCliente(nome, email, senha) {
  const [result] = await db.query(
    "INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha]
  );
  return result;
}

export async function atualizarCliente(id, nome, email, senha) {
  const [result] = await db.query(
    "UPDATE clientes SET nome = ?, email = ?, senha = ? WHERE id = ?",
    [nome, email, senha, id]
  );
  return result;
}

export async function excluirCliente(id) {
  const [result] = await db.query("DELETE FROM clientes WHERE id = ?", [id]);
  return result;
}