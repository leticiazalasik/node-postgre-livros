const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '2164',
  port: 5432,
});

(async () => {
    try {
        const autor = 'Carla'; // Valor de teste
        const autorFormatado = `%${autor}%`;
        
        console.log('Autor:', autor);
        console.log('Autor Formatado:', autorFormatado);

        let result = await pool.query('SELECT * FROM livros WHERE autor ILIKE $1', [autorFormatado]);

        console.log('Resultado da consulta:', result.rows);
    } catch (error) {
        console.error('Erro ao buscar livro:', error.message);
    } finally {
        pool.end(); // Fecha a conexão com o banco de dados
    }
})();
