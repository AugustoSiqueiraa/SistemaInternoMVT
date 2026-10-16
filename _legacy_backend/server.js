const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS (permite que o frontend acesse o backend)
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados do Railway PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:mMBTjzWKTveNjhigjKCxWbxzuvoCcWEf@tokaido.proxy.rlwy.net:11805/railway',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log('✅ Conectado ao banco de dados Railway com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar ao banco de dados:', err.stack));

// Servir arquivos estáticos (Frontend: HTML, CSS, JS) da mesma pasta
app.use(express.static(__dirname));

// ROTA DE TESTE DA API
app.get('/api/status', (req, res) => {
  res.json({ status: 'API MVT Advogados funcionando perfeitamente!', db: 'conectado' });
});

// Exemplo: Salvar Reuniões no Banco (API Endpoints que futuramente usaremos no frontend)
app.get('/api/meetings', async (req, res) => {
  try {
    // Primeiro vamos tentar criar a tabela se não existir
    await pool.query(`
      CREATE TABLE IF NOT EXISTS meetings (
        id VARCHAR(255) PRIMARY KEY,
        client_name VARCHAR(255) NOT NULL,
        client_phone VARCHAR(50),
        lawyer VARCHAR(100),
        area VARCHAR(100),
        time VARCHAR(10),
        meet_link TEXT,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const result = await pool.query('SELECT * FROM meetings ORDER BY time ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inicialização do Servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
