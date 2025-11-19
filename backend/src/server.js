import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // lee .env o .env.docker

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ ok: true, message: 'Backend DICRI funcionando' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
