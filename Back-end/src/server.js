const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

// Rotas
const videoRoutes = require("./routes/videos");
const getVideosRoutes = require("./routes/getVideos");
const updateLikesRoutes = require("./routes/updateLikes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Servir arquivos

// Usando rotas corretamente
app.use("/videos", videoRoutes);
app.use("/getvideos", getVideosRoutes);
app.use("/updateLikes", updateLikesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
