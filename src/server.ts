import express from 'express';
import livroRoutes from './routes/livroRoutes';

const app = express();

// Permite receber JSON nas requisições
app.use(express.json());

// Adiciona nossas rotas
app.use('/api', livroRoutes);

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});