require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mercadopago = require('mercadopago');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar ao banco de dados
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const db = mysql.createConnection(dbConfig);

module.exports = db;

const dbCallback = mysql.createConnection(dbConfig);

// Instância para promessas
const dbPromise = mysql.createConnection(dbConfig).promise();

module.exports = { dbCallback, dbPromise };

db.connect(err => {
  if (err) console.error(err);
  else console.log('Banco conectado!');
});

// 🔹 Registro de Usuário
app.post('/register', async (req, res) => {
  const { nome, sobrenome, email, senha } = req.body;

  if (!nome || !sobrenome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    db.query(
      'INSERT INTO usuario (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Erro ao registrar:', err);
          return res.status(400).json({ error: `Erro ao registrar: ${err.sqlMessage}` });
        }
        res.json({ message: 'Usuário registrado com sucesso!', id: results.insertId });
      }
    );
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// 🔹 Login de Usuário
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.query('SELECT * FROM usuario WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'Usuário não encontrado' });

    const user = results[0];
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        nome: user.nome, 
        sobrenome: user.sobrenome, 
        email: user.email 
      } 
    });
  });
});

// 🔹 Obter Dados do Usuário
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT id, nome, email FROM usuario WHERE id = ?', [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(results[0]);
  });
});

// 🔹 Rota para adicionar item ao carrinho
app.post('/api/carrinho', (req, res) => {
  const { usuario_id, produto_id, produto_nome, produto_preco, quantidade } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ message: 'Usuário não autenticado' });
  }

  // Verifica se o item já existe no carrinho do usuário
  const checkQuery = 'SELECT * FROM carrinho WHERE usuario_id = ? AND produto_id = ?';
  db.query(checkQuery, [usuario_id, produto_id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao verificar produto no carrinho' });
    }

    if (results.length > 0) {
      // Se já existe, aumenta a quantidade do produto
      const existingItem = results[0];
      const newQuantity = existingItem.quantidade + quantidade;

      const updateQuery = 'UPDATE carrinho SET quantidade = ?, produto_nome = ? WHERE usuario_id = ? AND produto_id = ?';
      db.query(updateQuery, [newQuantity, produto_nome, usuario_id, produto_id], (updateError) => {
        if (updateError) {
          return res.status(500).json({ message: 'Erro ao atualizar a quantidade do produto no carrinho' });
        }
        return res.status(200).json({ message: 'Quantidade atualizada no carrinho!' });
      });
    } else {
      // Se não existe, insere o novo item no carrinho
      const insertQuery = 'INSERT INTO carrinho (usuario_id, produto_id, produto_nome, produto_preco, quantidade) VALUES (?, ?, ?, ?, ?)';
      db.query(insertQuery, [usuario_id, produto_id, produto_nome, produto_preco, quantidade], (insertError) => {
        if (insertError) {
          return res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho' });
        }
        return res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso!' });
      });
    }
  });
});

app.delete('/api/carrinho/remove', async (req, res) => {
  const { usuario_id } = req.body;

  try {
    console.log('ID do usuário recebido:', usuario_id); // Log para depuração

    // Verifica se o usuário tem itens no carrinho
    const checkQuery = 'SELECT * FROM carrinho WHERE usuario_id = ?';
    const results = await new Promise((resolve, reject) => {
      db.query(checkQuery, [usuario_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    if (results.length === 0) {
      console.log('Carrinho vazio para o usuário:', usuario_id); // Log para depuração
      return res.status(404).json({ error: 'Carrinho vazio' });
    }

    // Remove todos os itens do carrinho do usuário
    const deleteQuery = 'DELETE FROM carrinho WHERE usuario_id = ?';
    await new Promise((resolve, reject) => {
      db.query(deleteQuery, [usuario_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    console.log('Itens removidos do carrinho para o usuário:', usuario_id); // Log para depuração
    return res.json({ message: 'Pagamento realizado com sucesso!' });

  } catch (error) {
    console.error("Erro ao remover itens do carrinho:", error);
    res.status(500).json({ error: 'Erro ao remover itens do carrinho' });
  }
});



app.get('/api/carrinho/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const query = `
    SELECT c.id, usuario_id, produto_id, c.produto_nome, c.produto_preco, c.quantidade
    FROM carrinho c
    WHERE c.usuario_id = ?`;

  db.query(query, [usuario_id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao buscar carrinho' });
    }

    return res.status(200).json(results);  // Retorna os dados encontrados
  });
});

// Exemplo de consulta aos cursos
// Rota para pegar as informações dos cursos (modalidade, genero, idade) de um usuário

// Exemplo de rota no servidor (Express.js)
app.post('/api/cursos', (req, res) => {
  const { usuario_id, modalidade, genero, idade } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ message: 'Usuário não autenticado' });
  }

  // Insere o novo curso, independentemente de já existir
  const insertQuery = 'INSERT INTO cursos (usuario_id, modalidade, genero, idade) VALUES (?, ?, ?, ?)';
  db.query(insertQuery, [usuario_id, modalidade, genero, idade], (insertError) => {
    if (insertError) {
      return res.status(500).json({ message: 'Erro ao adicionar curso' });
    }
    return res.status(200).json({ message: 'Curso registrado com sucesso!' });
  });
});

// Rota GET para buscar cursos de um usuário específico
app.get("/api/cursos/:usuario_id", (req, res) => {
  const { usuario_id } = req.params; // Obtém o ID do usuário a partir dos parâmetros da URL

  const query = `
    SELECT
      id,
      modalidade, 
      genero, 
      idade,
      tempo_restante
    FROM cursos
    WHERE usuario_id = ?
  `;

  db.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar cursos:", err);
      return res.status(500).json({ error: 'Erro ao buscar cursos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Nenhum curso encontrado para este usuário' });
    }

    // Retorna os cursos encontrados
    res.json(results);
  });
});


app.delete('/api/cursos/remove', async (req, res) => {
  const { curso_id, usuario_id } = req.body;  // Parâmetros para identificar o curso e o usuário

  try {
    // Verifica se o curso existe e pertence ao usuário
    const checkQuery = 'SELECT * FROM cursos WHERE id = ? AND usuario_id = ?';
    const results = await new Promise((resolve, reject) => {
      db.query(checkQuery, [curso_id, usuario_id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    // Se o curso não for encontrado, retorna erro
    if (results.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado ou não pertence ao usuário' });
    }

    // Caso o curso exista, remove o curso
    const deleteQuery = 'DELETE FROM cursos WHERE id = ? AND usuario_id = ?';
    await new Promise((resolve, reject) => {
      db.query(deleteQuery, [curso_id, usuario_id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    return res.json({ message: 'Curso removido com sucesso' });

  } catch (error) {
    console.error("Erro ao remover o curso:", error);
    res.status(500).json({ error: 'Erro ao remover o curso' });
  }
});

const router = express.Router();


// Rota para renovar o curso
app.put('/api/renovar_curso', (req, res) => {
  const { usuario_id, modalidade, genero, idade, tempo_restante } = req.body;

  if (!usuario_id) {
    return res.status(400).json({ message: 'Usuário não autenticado' });
  }

  // Verifica se o curso já existe para o usuário (baseado na tabela cursos)
  const checkQuery = 'SELECT * FROM cursos WHERE usuario_id = ? AND modalidade = ? AND genero = ? AND idade = ?';
  db.query(checkQuery, [usuario_id, modalidade, genero, idade], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao verificar curso no carrinho' });
    }

    if (results.length > 0) {
      // Se já existe, atualiza o tempo_restante
      const existingCourse = results[0];
      const newTimeRemaining = existingCourse.tempo_restante + tempo_restante;  // Atualiza o tempo restante

      const updateQuery = 'UPDATE cursos SET tempo_restante = ? WHERE usuario_id = ? AND modalidade = ? AND genero = ? AND idade = ?';
      db.query(updateQuery, [newTimeRemaining, usuario_id, modalidade, genero, idade], (updateError) => {
        if (updateError) {
          return res.status(500).json({ message: 'Erro ao atualizar o tempo restante do curso' });
        }
        return res.status(200).json({ message: 'Tempo restante atualizado com sucesso!' });
      });
    } else {
      return res.status(404).json({ message: 'Curso não encontrado para o usuário' });
    }
  });
});

module.exports = router;


// Método GET para pegar os dados
app.get('/api/alunos', (req, res) => {
  const query = `
    SELECT 
      cursos.id,
      cursos.usuario_id, 
      cursos.modalidade, 
      cursos.genero, 
      cursos.idade,
      cursos.tempo_restante,
      usuario.nome,
      usuario.sobrenome
    FROM cursos
    INNER JOIN usuario ON cursos.usuario_id = usuario.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar cursos:", err);
      return res.status(500).json({ error: 'Erro ao buscar cursos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Nenhum curso encontrado' });
    }

    // Retorna os cursos encontrados junto com o nome e sobrenome do usuário
    res.json(results);
  });
});

module.exports = router;
// backend/index.jx

// Step 2: Initialize the client object
mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);
app.post("/webhook", async (req, res) => {
  console.log("📩 Webhook chegou!");
  console.log("Payload:", req.body);

  const data = req.body;

  if (data.type === "payment") {
    const pagamentoId = data.data.id;
    console.log("🔎 ID do pagamento recebido:", pagamentoId); // ← Aqui estava o erro

    try {
      const pagamento = await mercadopago.payment.get(pagamentoId);
      console.log("✅ Status do pagamento:", pagamento.body.status);

      if (pagamento.body.status === "approved") {
        console.log("✅ Pagamento aprovado! ID:", pagamento.body.id);
        // Outras ações aqui
      }
    } catch (err) {
      console.error("Erro ao buscar pagamento:", err.message);
    }
  }

  res.sendStatus(200);
});

// Rota para criar o pagamento via PIX
app.post("/criar-pagamento", async (req, res) => {
  const { valor, descricao, email } = req.body;

  try {
    const pagamento = await mercadopago.payment.create({
      transaction_amount: parseFloat(valor),
      description: descricao,
      payment_method_id: "pix",
      payer: {
        email: email,
      },
      notification_url: "https://a4c73323bd3f.ngrok-free.app/webhook",
      metadata: {
        usuario_id: req.body.usuario_id,  // <- Você envia isso do frontend
        cart_items: req.body.cartItems,   // <- Também envia do frontend
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
      }
    });    

    console.log("Resposta do Mercado Pago:", pagamento.body);

    const qrCode = pagamento.body?.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64 = pagamento.body?.point_of_interaction?.transaction_data?.qr_code_base64;

    if (qrCode && qrCodeBase64) {
      return res.json({
        qrCode, // URL do QR Code
        qrCodeBase64: `data:image/png;base64,${qrCodeBase64}`, // Imagem Base64
        status: pagamento.body.status,
        transaction_id: pagamento.body.id,
      });
    } else {
      console.error("Erro: Mercado Pago não retornou o QR Code.");
      return res.status(400).json({ erro: "QR Code não gerado." });
    }
  } catch (erro) {
    console.error("Erro ao criar pagamento:", erro);
    res.status(500).json({ erro: "Erro ao processar pagamento." });
  }
});

app.get("/status-pagamento/:id", async (req, res) => {
  const { id } = req.params;
  console.log("🟡 Consultando status de:", id);

  try {
    const pagamento = await mercadopago.payment.get(id); // CORRETO!
    const status = pagamento.body.status;

    res.json({ status });
  } catch (erro) {
    console.error("Erro ao verificar status do pagamento:", erro.message);
    res.status(500).json({ erro: "Erro ao consultar status do pagamento." });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
  }
});

const upload = multer({ storage });

// Rota para adicionar produto
app.post('/api/produtos', upload.single('imagem'), (req, res) => {
  const { nome, categoria, preco, quantidade } = req.body;
  const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imagem_url) {
    return res.status(400).json({ error: 'Imagem obrigatória' });
  }

  const sql = 'INSERT INTO produto (nome, categoria, preco, quantidade, imagem_url) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome, categoria, preco, quantidade, imagem_url], (err, result) => {
    if (err) {
      console.error('Erro ao inserir produto:', err);
      return res.status(500).json({ error: 'Erro ao inserir produto' });
    }
    res.json({
      success: true,
      produto: {
        id: result.insertId,
        nome,
        categoria,
        preco,
        quantidade,
        imagem_url: `http://localhost:5000${imagem_url}`,  // A URL completa da imagem
      },
    });
  });
});

app.get('/api/produtos/solicitar', (req, res) => {
  const sql = 'SELECT * FROM produto';

  db.query(sql, (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Erro ao buscar produtos' });
      }

      // Adiciona o domínio completo à URL da imagem
      const produtos = result.map(prod => ({
        id: prod.id,
        nome: prod.nome,
        categoria: prod.categoria,
        preco: prod.preco,
        quantidade: prod.quantidade,
        imagem_url: `http://localhost:5000${prod.imagem_url}`, // A URL completa da imagem
      }));

      res.json({ produtos });
  });
});

// Rota para remover produto

app.delete('/api/produtos/remove', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID do produto não fornecido.' });
  }

  try {
    const [result] = await db.execute('DELETE FROM produto WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.status(200).json({ message: 'Produto removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao remover produto.' });
  }
});

app.delete('/api/produtos/remove-seguro', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID do produto não fornecido.' });
  }

  try {
    // Primeiro, remove todas as referências na tabela carrinho
    await dbPromise.execute('DELETE FROM carrinho WHERE produto_id = ?', [id]);

    // Depois, remove o produto da tabela produto
    const [result] = await dbPromise.execute('DELETE FROM produto WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.status(200).json({ message: 'Produto removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(500).json({ message: 'Erro interno ao tentar remover o produto.' });
  }
});



app.get('/api/categorias/solicitar', (req, res) => {
  const query = 'SELECT * FROM topicos';
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao recuperar categorias' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/categorias', (req, res) => {
  const { nome } = req.body;

  // Verificando se o nome foi fornecido
  if (!nome) {
    return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
  }

  // Consulta SQL para inserir a categoria
  const query = 'INSERT INTO topicos (nome) VALUES (?)';

  db.query(query, [nome], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao adicionar categoria' });
      return;
    }

    res.status(201).json({ message: 'Categoria adicionada com sucesso', id: results.insertId });
  });
});

app.put('/produto/update-quantity', async (req, res) => {
  const { produto_id, quantidade } = req.body;

  if (quantidade < 0) {
      return res.status(400).json({ message: "A quantidade não pode ser menor que 0." });
  }

  try {
      const query = "UPDATE produto SET quantidade = ? WHERE id = ?";
      await db.promise().query(query, [quantidade, produto_id]);

      res.json({ message: "Quantidade do produto atualizada com sucesso!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao atualizar a quantidade do produto." });
  }
});

app.get('/produto/quantidade/:id', async (req, res) => {
  const { id } = req.params;
  const query = "SELECT quantidade FROM produto WHERE id = ?";

  try {
    const [rows] = await dbPromise.execute(query, [id]);
    if (rows.length > 0) {
      res.json({ quantidade: rows[0].quantidade });
    } else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  } catch (err) {
    console.error("Erro ao buscar a quantidade do produto:", err);
    res.status(500).json({ message: "Erro ao buscar a quantidade." });
  }
});

app.put("/api/produtos/:produtoId", async (req, res) => {
  const produtoId = req.params.produtoId;  // Use o nome correto do parâmetro na URL; // Pega o ID do produto da URL
  const { quantidadeComprada } = req.body; // Pega a quantidade comprada do corpo da requisição

  console.error(`Atualizando produto com ID: ${produtoId}`);
  console.error(`Quantidade comprada: ${quantidadeComprada}`);

  if (typeof quantidadeComprada !== 'number' || quantidadeComprada <= 0) {
    return res.status(400).send("Quantidade inválida");
  }

  try {
    // Atualiza a quantidade do produto no banco
    console.error('Atualizando produto com ID:', produtoId);
    const query = "UPDATE produto SET quantidade = quantidade - ? WHERE id = ?";
    const [result] = await db.promise().execute(query, [quantidadeComprada, produtoId]);

    console.log(result);  // Verifique o resultado da consulta

    if (result.affectedRows === 0) {
      return res.status(404).send("Produto não encontrado");
    }

    res.status(200).send("Quantidade do produto atualizada com sucesso");
  } catch (error) {
    console.error("Erro na consulta:", error);
    res.status(500).send("Erro ao atualizar a quantidade do produto");
  }
});

app.put('/treinos/:id', (req, res) => {
  const treinoId = req.params.id;
  const { assistido } = req.body; 

  if (typeof assistido !== 'boolean') {
    return res.status(400).json({ message: 'O campo "assistido" deve ser um booleano' });
  }

  const query = `UPDATE treinos SET assistido = ? WHERE id = ?`;
  db.query(query, [assistido, treinoId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao atualizar status do treino.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Treino não encontrado.' });
    }

    res.status(200).json({
      message: 'Status de treino atualizado com sucesso!',
      treinoId,
      assistido
    });
  });
});

app.post('/adicionar-bloco-treino', (req, res) => {
  const { nome, userId, cursoId } = req.body;

  if (!nome || !userId || !cursoId) {
    return res.status(400).json({ message: 'Preencha todos os campos corretamente!' });
  }

  const sql = 'INSERT INTO treinos (nome, usuario_id, curso_id) VALUES (?, ?, ?)';
  db.query(sql, [nome, userId, cursoId], (err, result) => {
    if (err) {
      console.error('Erro ao criar bloco de treino:', err);
      return res.status(500).json({ message: 'Erro no servidor' });
    }
    res.status(200).json({ message: 'Bloco de treino criado com sucesso!', id: result.insertId });
  });
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const uploadVideo = multer({ storage: videoStorage });

app.post('/adicionar-exercicio', uploadVideo.single('video'), (req, res) => {
  const { titulo, mensagem, assistido, treinoId } = req.body;
  const file = req.file;

  if (!titulo || !file || treinoId === undefined) {
    return res.status(400).json({ message: 'Preencha todos os campos corretamente!' });
  }

  const videoPath = `http://localhost:5000/uploads/videos/${file.filename}`;

  const sql = 'INSERT INTO exercicios (titulo, video, mensagem, assistido, treino_id) VALUES (?, ?, ?, ?, ?)';
  const values = [titulo, videoPath, mensagem || '', assistido === 'true', treinoId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao adicionar exercício:', err);
      return res.status(500).json({ message: 'Erro no servidor' });
    }

    res.status(200).json({
      message: 'Exercício adicionado com sucesso!',
      id: result.insertId,
      videoUrl: videoPath
    });
  });
});

app.delete('/api/remover/exercicios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM exercicios WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao remover exercício:', err);
      return res.status(500).json({ message: 'Erro ao remover exercício' });
    }
    res.status(200).json({ message: 'Exercício removido com sucesso!' });
  });
});

app.get('/api/treino/:treinoId/exercicios', (req, res) => {
  const { treinoId } = req.params;

  const sql = 'SELECT * FROM exercicios WHERE treino_id = ?';

  db.query(sql, [treinoId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar exercícios:', err);
      return res.status(500).json({ message: 'Erro no servidor ao buscar exercícios' });
    }

    res.status(200).json(results);
  });
});

app.get('/api/treinos-com-exercicios/:userId/:cursoId', (req, res) => {
  const { userId, cursoId } = req.params;

  const sql = `
    SELECT 
      t.id AS treinoId, t.nome AS treinoNome,
      e.id AS exercicioId, e.titulo, e.video, e.mensagem, e.assistido
    FROM treinos t
    LEFT JOIN exercicios e ON t.id = e.treino_id
    WHERE t.usuario_id = ? AND t.curso_id = ?
    ORDER BY t.id, e.id
  `;

  db.query(sql, [userId, cursoId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar treinos com exercícios:', err);
      return res.status(500).json({ message: 'Erro ao buscar dados.' });
    }

    const treinosMap = {};

    results.forEach(row => {
      if (!treinosMap[row.treinoId]) {
        treinosMap[row.treinoId] = {
          id: row.treinoId,
          nome: row.treinoNome,
          exercicios: []
        };
      }

      if (row.exercicioId) {
        treinosMap[row.treinoId].exercicios.push({
          id: row.exercicioId,
          titulo: row.titulo,
          video: row.video,
          mensagem: row.mensagem,
          assistido: row.assistido
        });
      }
    });

    res.status(200).json(Object.values(treinosMap));
  });
});

app.get('/api/treinos/solicitar/aluno/:userId/:cursoId', (req, res) => {
  const { userId, cursoId } = req.params;

  const treinosQuery = `
    SELECT t.id AS treino_id, t.nome AS treino_nome, 
           e.id AS exercicio_id, e.titulo, e.mensagem, e.video
    FROM treinos t
    LEFT JOIN exercicios e ON e.treino_id = t.id
    WHERE t.usuario_id = ? AND t.curso_id = ?
  `;

  db.query(treinosQuery, [userId, cursoId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar treinos com exercícios:', err);
      return res.status(500).json({ message: 'Erro no servidor' });
    }

    // Agrupar por treino
    const treinosMap = {};
    results.forEach(row => {
      if (!treinosMap[row.treino_id]) {
        treinosMap[row.treino_id] = {
          id: row.treino_id,
          nome: row.treino_nome,
          exercicios: []
        };
      }

      if (row.exercicio_id) {
        treinosMap[row.treino_id].exercicios.push({
          id: row.exercicio_id,
          titulo: row.titulo,
          mensagem: row.mensagem,
          video: row.video
        });
      }
    });

    const treinos = Object.values(treinosMap);
    res.json(treinos);
  });
});

app.delete('/api/remover/exercicios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM exercicios WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao remover exercício:', err);
      return res.status(500).json({ message: 'Erro ao remover exercício' });
    }
    res.status(200).json({ message: 'Exercício removido com sucesso!' });
  });
});

app.patch('/api/treinos/:id/renomear', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ message: 'Nome do treino é obrigatório!' });
  }

  try {
    const [result] = await db.promise().query(
      'UPDATE treinos SET nome = ? WHERE id = ?',
      [nome, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Treino não encontrado!' });
    }

    res.status(200).json({ message: 'Treino renomeado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao renomear treino!' });
  }
});

app.patch('/api/treinos/:id/trocar-video', async (req, res) => {
  const { id } = req.params;
  const { video } = req.body;

  if (!video) {
    return res.status(400).json({ message: 'URL do vídeo é obrigatória!' });
  }

  try {
    const [result] = await db.promise().query(
      'UPDATE treinos SET video = ? WHERE id = ?',
      [video, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Treino não encontrado!' });
    }

    res.status(200).json({ message: 'Vídeo trocado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao trocar vídeo!' });
  }
});

app.put('/api/progress/:userId/:cursoId', (req, res) => {
  const { userId, cursoId } = req.params;
  const { progress, checkbox } = req.body;

  // Validação de dados
  if (userId && cursoId && progress >= 0 && progress <= 100 && Array.isArray(checkbox)) {
    const checkboxString = JSON.stringify(checkbox); // ✅ Converte array para string

    const query = `UPDATE cursos SET barra_progresso = ?, checkbox = ? WHERE id = ? AND usuario_id = ?`;

    db.query(query, [progress, checkboxString, cursoId, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar o progresso' });
      }
      res.status(200).json({ message: 'Progresso atualizado com sucesso' });
    });
  } else {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

app.get('/api/progress/solicitar/:userId/:cursoId', (req, res) => {
  const { userId, cursoId } = req.params;

  const query = `SELECT barra_progresso, checkbox FROM cursos WHERE id = ? AND usuario_id = ?`;

  db.query(query, [cursoId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar dados de progresso' });
    }
    if (result.length > 0) {
      const progressData = result[0];
      let checkboxArray = [];

      try {
        checkboxArray = JSON.parse(progressData.checkbox || '[]'); // fallback se null
      } catch (parseError) {
        console.error("Erro ao converter checkbox para JSON:", parseError);
      }

      res.status(200).json({
        progress: progressData.barra_progresso,
        checkbox: checkboxArray
      });
    } else {
      res.status(404).json({ error: 'Progresso não encontrado' });
    }
  });
});

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

app.post("/criar-pagamento-curso", async (req, res) => {
  const { valor, descricao, email, usuario_id, modalidade, genero, idade } = req.body;

  try {
    const pagamento = await mercadopago.payment.create({
      transaction_amount: parseFloat(valor),
      description: descricao,
      payment_method_id: "pix",
      payer: { email },
      notification_url: "https://a4c73323bd3f.ngrok-free.app/webhook",
      metadata: { usuario_id, modalidade, genero, idade }
    });

    const qrData = pagamento.body.point_of_interaction.transaction_data;

    if (qrData.qr_code && qrData.qr_code_base64) {
      return res.json({
        qrCode: qrData.qr_code,
        qrCodeBase64: `data:image/png;base64,${qrData.qr_code_base64}`,
        status: pagamento.body.status,
        transaction_id: pagamento.body.id
      });
    } else {
      return res.status(400).json({ erro: "QR Code não gerado." });
    }
  } catch (erro) {
    console.error("❌ Erro ao criar pagamento:", erro);
    res.status(500).json({ erro: "Erro ao criar pagamento." });
  }
});

app.get("/verificar-status-curso/:id", async (req, res) => {
  const { id } = req.params;
  console.log("🟡 Consultando status de:", id);

  try {
    const pagamento = await mercadopago.payment.get(id);
    const status = pagamento.body.status;

    res.json({ status });
  } catch (erro) {
    console.error("Erro ao verificar status do pagamento:", erro.message);
    res.status(500).json({ erro: "Erro ao consultar status do pagamento." });
  }
});

app.post("/criar-pagamento-cartao", async (req, res) => {
  const { valor, descricao, email } = req.body;

  const preco = Number(valor?.toString().replace(",", "."));

  console.log("Valor recebido:", valor, "| Convertido:", preco);

  if (isNaN(preco) || preco <= 0) {
    return res.status(400).json({ erro: "Valor inválido para pagamento." });
  }

  const preference = {
    items: [{
      title: descricao || "Pagamento",
      quantity: 1,
      currency_id: "BRL",
      unit_price: preco
    }],
    payer: {
      email: email || "comprador@teste.com"
    },
    back_urls: {
      success: "https://a4c73323bd3f.ngrok-free.app/sucesso",
      failure: "https://a4c73323bd3f.ngrok-free.app/erro",
      pending: "https://a4c73323bd3f.ngrok-free.app/pendente"
    },
    auto_return: "approved"
  };

  try {
    const resposta = await mercadopago.preferences.create(preference);
    res.json({ init_point: resposta.body.init_point });
  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    res.status(500).send("Erro ao criar pagamento");
  }
});

app.post("/criar-pagamento-cartao-curso", async (req, res) => {
  const { valor, descricao, email } = req.body;
  const preco = Number(valor);

  const preference = {
    items: [{
      title: descricao || "Curso",
      quantity: 1,
      currency_id: "BRL",
      unit_price: preco
    }],
    payer: { email },
    back_urls: {
      success: "https://a4c73323bd3f.ngrok-free.app/sucesso",
      failure: "https://a4c73323bd3f.ngrok-free.app/erro",
      pending: "https://a4c73323bd3f.ngrok-free.app/pendente"
    },
    auto_return: "approved"
  };

  try {
    const resposta = await mercadopago.preferences.create(preference);
    console.log("✅ INIT POINT:", resposta.body.init_point);
    res.json({ init_point: resposta.body.init_point });

  } catch (error) {
    console.error("Erro ao criar pagamento com cartão:", error);
    res.status(500).send("Erro ao criar pagamento");
  }
});

app.post('/processar-pagamento-cartao', async (req, res) => {
  try {
    const payment = await mercadopago.payment.create({
      transaction_amount: req.body.amount,
      token: req.body.token,
      description: req.body.description,
      installments: req.body.installments,
      payment_method_id: req.body.payment_method_id,
      issuer_id: req.body.issuer_id,
      payer: {
        email: req.body.email,
      }
    });

    res.json(payment.body);
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    res.status(500).json({ error: "Erro no pagamento" });
  }
});

app.post('/processar-pagamento-cartao-produtos', async (req, res) => {
  try {
    const {
      token,
      payment_method_id,
      issuer_id,
      installments,
      email,
      amount,
      description,
      usuario_id,
      cartItems
    } = req.body;

    const payment_data = {
      transaction_amount: Number(amount),
      token,
      description,
      installments: Number(installments),
      payment_method_id,
      issuer_id,
      payer: {
        email
      }
    };

    const result = await mercadopago.payment.create(payment_data);

    if (result.body.status === "approved") {
      // Aqui você pode salvar pedido no banco, enviar e-mail etc.
      return res.status(200).json({
        status: "approved",
        id: result.body.id,
        message: "Pagamento aprovado com sucesso"
      });
    } else {
      return res.status(400).json({
        status: result.body.status,
        message: "Pagamento não aprovado ou pendente"
      });
    }

  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    return res.status(500).json({ error: "Erro interno ao processar pagamento" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

//https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=2251380261-f6463ed2-a4b9-4027-94f1-994dbca82cb0