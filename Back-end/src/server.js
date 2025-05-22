const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videos");
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads")); // Servir arquivos
app.use("/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
