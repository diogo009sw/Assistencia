import { useEffect, useState } from "react";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    carregarClientes();
  }, []);

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
      setClientes([]);
      alert(err.message);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function limparFormulario() {
    setForm({
      nome: "",
      email: "",
      senha: "",
    });
    setEditandoId(null);
  }

  async function salvar() {
    if (!form.nome || !form.email || !form.senha) {
      alert("Preencha nome, email e senha");
      return;
    }

    try {
      let res;

      if (editandoId) {
        res = await fetch(`http://localhost:3000/clientes/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("http://localhost:3000/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const texto = await res.text();
        throw new Error("Servidor não retornou JSON: " + texto);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao salvar cliente");
      }

      alert(editandoId ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!");
      limparFormulario();
      carregarClientes();
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
      alert(err.message);
    }
  }

  function editar(cliente) {
    setEditandoId(cliente.id);
    setForm({
      nome: cliente.nome || "",
      email: cliente.email || "",
      senha: cliente.senha || "",
    });
  }

  async function excluir(id) {
    const confirmar = window.confirm("Deseja realmente excluir este cliente?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const texto = await res.text();
        throw new Error("Servidor não retornou JSON: " + texto);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao excluir cliente");
      }

      alert("Cliente excluído com sucesso!");

      if (editandoId === id) {
        limparFormulario();
      }

      carregarClientes();
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
      alert(err.message);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Clientes</h1>

      <div style={styles.formCard}>
        <h2>{editandoId ? "Editar Cliente" : "Cadastrar Cliente"}</h2>

        <div style={styles.inputGroup}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="text"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={salvar} style={styles.saveButton}>
            {editandoId ? "Atualizar" : "Cadastrar"}
          </button>

          {editandoId && (
            <button onClick={limparFormulario} style={styles.cancelButton}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      {clientes.length === 0 ? (
        <p style={{ textAlign: "center" }}>Nenhum cliente encontrado</p>
      ) : (
        <div style={styles.grid}>
          {clientes.map((c) => (
            <div key={c.id} style={styles.card}>
              <h3>{c.nome}</h3>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Senha:</strong> ••••••••</p>
              <p>
                <strong>Criado em:</strong>{" "}
                {c.created_at ? new Date(c.created_at).toLocaleString("pt-BR") : "Sem data"}
              </p>

              <div style={styles.cardButtons}>
                <button onClick={() => editar(c)} style={styles.editButton}>
                  Editar
                </button>

                <button onClick={() => excluir(c.id)} style={styles.deleteButton}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  formCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
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
    marginTop: "10px",
  },
  saveButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "#fff",
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
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Clientes;