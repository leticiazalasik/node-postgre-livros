import { Request, Response } from 'express';
import { pool } from '../config/database';

// Aqui vamos criar funções para gerenciar os livros
export const livroController = {
    // Função para criar um novo livro
    async criar(req: Request, res: Response) {
        try {
            // Pega os dados enviados na requisição
            const { titulo, autor, ano_publicacao } = req.body;

            // Insere no banco de dados
            const result = await pool.query(
                'INSERT INTO livros (titulo, autor, ano_publicacao) VALUES ($1, $2, $3) RETURNING *',
                [titulo, autor, ano_publicacao]
            );

            // Retorna o livro criado
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao criar livro:', error);
            res.status(500).json({ erro: 'Erro ao criar livro' });
        }
    },

    // Função para listar todos os livros
    async listar(req: Request, res: Response) {
        try {
            const result = await pool.query('SELECT * FROM livros');
            res.json(result.rows);
        } catch (error) {
            console.error('Erro ao listar livros:', error);
            res.status(500).json({ erro: 'Erro ao listar livros' });
        }
    },

   // Função para listar livro por id
    async listarPorId(req: Request, res: Response) {
    try {
        // Extraímos o id do parâmetro da URL
        const id = req.params.id; // Isso assume que o ID está na URL (ex: /livros/:id)
        
        // Usamos um parâmetro de consulta para evitar SQL injection
        const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
        
        // Retorna o resultado da consulta
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Retorna o livro encontrado
        } else {
            res.status(404).json({ erro: 'Livro não encontrado' }); // Caso o livro não exista
        }
    } catch (error) {
        console.error('Erro ao buscar livro:', error);
        res.status(500).json({ erro: 'Erro ao buscar livro' });
    }
},


 // Função para atualizar um livro por id
async atualizarLivro(req: Request, res: Response) {
    try {
        const id = req.params.id; // Extraímos o id do parâmetro da URL (ex: /livros/:id)
        const { titulo, autor, ano_publicacao } = req.body;

        // Verifica se o livro existe
        let result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
        
        if (result.rows.length > 0) {
            // Atualiza o livro no banco de dados
            result = await pool.query(
                'UPDATE livros SET titulo = $1, autor = $2, ano_publicacao = $3 WHERE id = $4 RETURNING *',
                [titulo, autor, ano_publicacao, id] // Passando o id para identificar o livro a ser atualizado
            );

            // Retorna o livro atualizado
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ erro: 'Livro não encontrado' }); // Caso o livro não exista
        }
        
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ erro: 'Erro ao atualizar livro' });
    }
},

// Função para atualizar deletar livro
async deletarLivro(req: Request, res: Response) {
    try {
        const id = req.params.id; // Extraímos o id do parâmetro da URL (ex: /livros/:id)

        // Verifica se o livro existe
        let result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
        
        if (result.rows.length > 0) {
            // Atualiza o livro no banco de dados
            result = await pool.query(
                'DELETE FROM livros WHERE id = $1',
                [id] // Passando o id para identificar o livro a ser atualizado
            );

             // Retorna o livro deletado
             res.status(200).json({ message: 'Livro deletado com sucesso'});

        } else {
            res.status(404).json({ erro: 'Livro não encontrado' }); // Caso o livro não exista
        }
        
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        res.status(500).json({ erro: 'Erro ao deletar livro' });
    }
},

// Função buscar livro por autor 
async buscarPorAutor(req: Request, res: Response) {
    try {
        const autor = req.params.autor; // Extraímos o autor do parâmetro da URL
        const autorFormatado = `%${autor}%`;

        // Log para depuração
        console.log('Autor recebido:', autor); // Verifique se o parâmetro está sendo capturado corretamente
        console.log('Autor formatado para consulta:', autorFormatado);

        // Verifica se o livro existe
        let result = await pool.query('SELECT * FROM livros WHERE autor ILIKE $1', [autorFormatado]);

        // Log para depuração
        console.log('Resultado da consulta:', result.rows);

        if (result.rows.length > 0) {
            res.json(result.rows); // Retorna o livro encontrado
        } else {
            res.status(404).json({ erro: 'Livro não encontrado' }); // Caso o livro não exista
        }

    } catch (error) {
        console.error('Erro ao buscar livro:');
        res.status(500).json({ erro: 'Erro ao buscar livro' });
    }
},

// Função para buscar livro por ano de publicação
async buscarPorAno(req: Request, res: Response) {
    try {
        const ano_publicacao = req.params.ano_publicacao; // Corrigido: extraímos o ano da URL

        // Verifica se o livro existe
        let result = await pool.query('SELECT * FROM livros WHERE ano_publicacao = $1', [ano_publicacao]);

        // Log para depuração
        console.log('Resultado da consulta:', result.rows);

        if (result.rows.length > 0) {
            res.json(result.rows); // Retorna o livro encontrado
        } else {
            res.status(404).json({ erro: 'Livro não encontrado' }); // Caso o livro não exista
        }

    } catch (error) {
        console.error('Erro ao buscar livro:', error);
        res.status(500).json({ erro: 'Erro ao buscar livro' });
    }
}



};