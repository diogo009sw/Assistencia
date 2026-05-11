import connection from "../database/connection.js";

export const createOrdem = async (ordem) => {
  const { cliente_id, equipamento_id, descricao, status } = ordem;

  const query = `
    INSERT INTO ordens (cliente_id, equipamento_id, descricao, status)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await connection.execute(query, [
    cliente_id,
    equipamento_id,
    descricao,
    status || "aberta",
  ]);

  return result.insertId;
};

export const getOrdens = async () => {
  const [rows] = await connection.execute("SELECT * FROM ordens");
  return rows;
};

export const getOrdemById = async (id) => {
  const [rows] = await connection.execute(
    "SELECT * FROM ordens WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateOrdem = async (id, ordem) => {
  const { descricao, status } = ordem;

  await connection.execute(
    `UPDATE ordens SET descricao = ?, status = ? WHERE id = ?`,
    [descricao, status, id]
  );
};

export const deleteOrdem = async (id) => {
  await connection.execute("DELETE FROM ordens WHERE id = ?", [id]);
};