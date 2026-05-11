import db from "../config/database.js";

export async function listarEquipamentos() {
  const [rows] = await db.query(`
    SELECT 
      e.id,
      e.cliente_id,
      c.nome AS cliente_nome,
      e.nome,
      e.marca,
      e.modelo,
      e.problema,
      e.created_at
    FROM equipamentos e
    INNER JOIN clientes c ON c.id = e.cliente_id
    ORDER BY e.id DESC
  `);
  return rows;
}

export async function inserirEquipamento(cliente_id, nome, marca, modelo, problema) {
  const [result] = await db.query(
    "INSERT INTO equipamentos (cliente_id, nome, marca, modelo, problema) VALUES (?, ?, ?, ?, ?)",
    [cliente_id, nome, marca, modelo, problema]
  );
  return result;
}

export async function atualizarEquipamento(id, cliente_id, nome, marca, modelo, problema) {
  const [result] = await db.query(
    "UPDATE equipamentos SET cliente_id = ?, nome = ?, marca = ?, modelo = ?, problema = ? WHERE id = ?",
    [cliente_id, nome, marca, modelo, problema, id]
  );
  return result;
}

export async function excluirEquipamento(id) {
  const [result] = await db.query("DELETE FROM equipamentos WHERE id = ?", [id]);
  return result;
}