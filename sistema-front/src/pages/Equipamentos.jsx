import React, { useEffect, useState } from "react";

function EquipamentoForm({ equipamentoEditando, onSalvar, cancelarEdicao }) {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    cliente_id: "",
    nome: "",
    marca: "",
    modelo: "",
    problema: "",
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  useEffect(() => {
    if (equipamentoEditando) {
      setForm({
        cliente_id: equipamentoEditando.cliente_id || "",
        nome: equipamentoEditando.nome || "",
        marca: equipamentoEditando.marca || "",
        modelo: equipamentoEditando.modelo || "",
        problema: equipamentoEditando.problema || "",
      });
    } else {
      setForm({
        cliente_id: "",
        nome: "",
        marca: "",
        modelo: "",
        problema: "",
      });
    }
  }, [equipamentoEditando]);

  async function carregarClientes() {
    try {
      const res = await fetch("http://localhost:3000/clientes");
      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const texto = await res.text();
        throw new Error("Servidor não retornou JSON: " + texto);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao carregar clientes");
      }

      setClientes(data);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
      alert(err.message);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res;

      const payload = {
        ...form,
        cliente_id: Number(form.cliente_id),
      };

      if (equipamentoEditando) {
        res = await fetch(`http://localhost:3000/equipamentos/${equipamentoEditando.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:3000/equipamentos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const texto = await res.text();
        throw new Error("Servidor não retornou JSON: " + texto);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao salvar equipamento");
      }

      alert(
        equipamentoEditando
          ? "Equipamento atualizado com sucesso!"
          : "Equipamento cadastrado com sucesso!"
      );

      setForm({
        cliente_id: "",
        nome: "",
        marca: "",
        modelo: "",
        problema: "",
      });

      onSalvar();
    } catch (err) {
      console.error("Erro ao salvar equipamento:", err);
      alert(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.formCard}>
      <h2 style={styles.title}>
        {equipamentoEditando ? "Editar Equipamento" : "Cadastrar Equipamento"}
      </h2>

      <div style={styles.inputGroup}>
        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Selecione o cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="nome"
          placeholder="Nome do equipamento"
          value={form.nome}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <input
          type="text"
          name="problema"
          placeholder="Problema"
          value={form.problema}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button type="submit" style={styles.button}>
          {equipamentoEditando ? "Atualizar" : "Cadastrar"}
        </button>

        {equipamentoEditando && (
          <button type="button" onClick={cancelarEdicao} style={styles.cancelButton}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

function EquipamentoList({ equipamentos, onEditar, onExcluir }) {
  if (!equipamentos || equipamentos.length === 0) {
    return <p style={{ textAlign: "center" }}>Nenhum equipamento encontrado.</p>;
  }

  return (
    <div style={styles.list}>
      {equipamentos.map((equipamento) => (
        <div key={equipamento.id} style={styles.card}>
          <h3>{equipamento.nome}</h3>
          <p><strong>Cliente:</strong> {equipamento.cliente_nome}</p>
          <p><strong>Marca:</strong> {equipamento.marca}</p>
          <p><strong>Modelo:</strong> {equipamento.modelo}</p>
          <p><strong>Problema:</strong> {equipamento.problema}</p>
          <small>
            Criado em: {new Date(equipamento.created_at).toLocaleString("pt-BR")}
          </small>

          <div style={styles.cardButtons}>
            <button style={styles.editButton} onClick={() => onEditar(equipamento)}>
              Editar
            </button>

            <button style={styles.deleteButton} onClick={() => onExcluir(equipamento.id)}>
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamentoEditando, setEquipamentoEditando] = useState(null);

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  async function carregarEquipamentos() {
    try {
      const res = await fetch("http://localhost:3000/equipamentos");
      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const texto = await res.text();
        throw new Error("Servidor não retornou JSON: " + texto);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao carregar equipamentos");
      }

      setEquipamentos(data);
    } catch (err) {
      console.error("Erro ao carregar equipamentos:", err);
      setEquipamentos([]);
      alert(err.message);
    }
  }

  function editarEquipamento(equipamento) {
    setEquipamentoEditando(equipamento);
  }

  function cancelarEdicao() {
    setEquipamentoEditando(null);
  }

  function equipamentoSalvo() {
    setEquipamentoEditando(null);
    carregarEquipamentos();
  }

  async function excluirEquipamento(id) {
    const confirmar = window.confirm("Deseja realmente excluir este equipamento?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/equipamentos/${id}`, {
        method: "DELETE",
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const texto = await res.text();
        throw new Error("Servidor não retornou JSON: " + texto);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao excluir equipamento");
      }

      alert("Equipamento excluído com sucesso!");
      carregarEquipamentos();
    } catch (err) {
      console.error("Erro ao excluir equipamento:", err);
      alert(err.message);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Cadastro de Equipamentos</h1>

      <EquipamentoForm
        equipamentoEditando={equipamentoEditando}
        onSalvar={equipamentoSalvo}
        cancelarEdicao={cancelarEdicao}
      />

      <EquipamentoList
        equipamentos={equipamentos}
        onEditar={editarEquipamento}
        onExcluir={excluirEquipamento}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "15px",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  button: {
    flex: 1,
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "15px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  cardButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  editButton: {
    flex: 1,
    padding: "8px",
    background: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    padding: "8px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Equipamentos;