const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do multer para salvar arquivos na pasta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});

const upload = multer({ storage });

// Middleware para permitir CORS
app.use(cors());

// Rota para servir arquivos estáticos (frontend)
app.use(express.static('public'));

// Rota para upload de fotos
app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhuma foto foi enviada.');
    }
    res.send(`Foto enviada com sucesso: ${req.file.filename}`);
});

// Criar a pasta 'uploads' se ela não existir
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});