import { useState } from "react";
import Clientes from "./pages/Clientes";
import Equipamentos from "./pages/Equipamentos";

export default function App() {
  const [pagina, setPagina] = useState("clientes");

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Assistência Técnica</h1>

        <div style={styles.menu}>
          <button
            onClick={() => setPagina("clientes")}
            style={
              pagina === "clientes"
                ? { ...styles.button, ...styles.activeButton }
                : styles.button
            }
          >
            Clientes
          </button>

          <button
            onClick={() => setPagina("equipamentos")}
            style={
              pagina === "equipamentos"
                ? { ...styles.button, ...styles.activeButton }
                : styles.button
            }
          >
            Equipamentos
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {pagina === "clientes" ? <Clientes /> : <Equipamentos />}
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
  },
  header: {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
  },
  logo: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    fontSize: "28px",
    color: "#333",
  },
  menu: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#e9ecef",
    color: "#333",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  main: {
    padding: "20px",
  },
};