import { Router } from 'express';
import { livroController } from '../controllers/livroController';

const router = Router();

// Define as rotas e conecta com as funções do controller
router.post('/livros', livroController.criar);
router.get('/livros', livroController.listar);
router.get('/livros/:id', livroController.listarPorId);
router.put('/livros/:id', livroController.atualizarLivro);
router.delete('/livros/:id', livroController.deletarLivro);
router.get('/livros/autor/:autor', livroController.buscarPorAutor);
router.get('/livros/ano/:ano_publicacao', livroController.buscarPorAno);


export default router;