const pool = require("./src/config/db");

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT NOW()");
    console.log("Conexão OK, hora do banco:", rows);
  } catch (error) {
    console.error("Erro na conexão com o banco:", error);
  } finally {
    pool.end();
  }
}

testConnection();
