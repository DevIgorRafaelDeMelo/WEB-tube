const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

// Configuração multer para armazenar arquivos localmente em 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // cria nome único para o arquivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Rota que recebe dois arquivos: 'url' (vídeo) e 'image_url' (imagem)
router.post(
  "/",
  upload.fields([
    { name: "url", maxCount: 1 },
    { name: "image_url", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      const { title, description, rating } = req.body;
      const categories = req.body["categories[]"] || []; // Pode vir como array ou string

      // Se veio uma única categoria como string, transforma em array
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      const videoFile = req.files.url ? req.files.url[0] : null;
      const imageFile = req.files.image_url ? req.files.image_url[0] : null;

      // Aqui você salva os dados no banco, por exemplo
      // videoFile.path tem o caminho do arquivo salvo no servidor

      // Apenas exemplo de resposta
      res.status(201).json({
        message: "Vídeo cadastrado com sucesso",
        data: {
          title,
          description,
          rating,
          categories: categoriesArray,
          videoPath: videoFile ? videoFile.path : null,
          imagePath: imageFile ? imageFile.path : null,
        },
      });
    } catch (err) {
      console.error("Erro ao cadastrar vídeo:", err);
      res.status(500).json({ error: "Erro ao cadastrar vídeo" });
    }
  }
);

module.exports = router;
