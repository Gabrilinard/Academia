const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailjs = require('emailjs-com'); // Importação do EmailJS
const mercadopago = require('mercadopago');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const QRCode = require('qrcode');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar ao banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Medusawebby210',
  database: 'academia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;

const dbCallback = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Medusawebby210',
  database: 'academia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Instância para promessas
const dbPromise = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Medusawebby210',
  database: 'academia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

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

    const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

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
mercadopago.configurations.setAccessToken('APP_USR-4216646157661560-050108-4b75d865503f098e3643fe6d8b5c5b1c-1950574241');
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
      notification_url: "https://a64d-177-107-30-154.ngrok-free.app/webhook",
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


// Endpoint para atualizar o status do treino
app.put('/treinos/:id', (req, res) => {
  const treinoId = req.params.id; // Id do treino
  const { assistido } = req.body; // Status de confirmação

  // Validação do status (assistido deve ser booleano)
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

app.post('/adicionar-treino', (req, res) => {
  const { nome, titulo, video, assistido, userId, cursoId} = req.body;

  if (!nome || !titulo || !video || !userId || !cursoId) {
      return res.status(400).json({ message: 'Preencha todos os campos corretamente!' });
  }

  const sql = 'INSERT INTO treinos (nome, titulo, video, assistido, usuario_id, curso_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, titulo, video, assistido, userId, cursoId], (err, result) => {
      if (err) {
          console.error('Erro ao inserir treino:', err);
          return res.status(500).json({ message: 'Erro no servidor' });
      }
      res.status(200).json({ message: 'Treino adicionado com sucesso!' });
  });
});

// No arquivo do backend (Ex: server.js ou routes.js)
app.get('/api/treinos/solicitar/:userId/:cursoId', async (req, res) => {
  try {
    const { userId, cursoId } = req.params;
    console.log("UserID recebido:", userId);
    console.log("CursoID recebido:", cursoId); // Exibindo o cursoId também

    // Query para buscar treinos que correspondem ao userId e cursoId
    const [rows] = await db.promise().query('SELECT * FROM treinos WHERE usuario_id = ? AND curso_id = ?', [userId, cursoId]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: "Nenhum treino encontrado para este usuário e curso" });
    }
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get('/api/treinos/solicitar/aluno/:userId/:cursoId', async (req, res) => {
  try {
    const { userId, cursoId } = req.params;
    console.log("UserID recebido:", userId);
    console.log("CursoID recebido:", cursoId); // Exibindo o cursoId também

    // Query para buscar treinos que correspondem ao userId e cursoId
    const [rows] = await db.promise().query('SELECT * FROM treinos WHERE usuario_id = ? AND curso_id = ?', [userId, cursoId]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: "Nenhum treino encontrado para este usuário e curso" });
    }
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


// Rota para remover um treino
app.delete('/api/treinos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.promise().query(
      'DELETE FROM treinos WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Treino não encontrado!' });
    }

    res.status(200).json({ message: 'Treino removido com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao remover treino!' });
  }
});


// Rota para renomear um treino
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

// Rota para trocar o vídeo de um treino
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

mercadopago.configurations.setAccessToken('APP_USR-4216646157661560-050108-4b75d865503f098e3643fe6d8b5c5b1c-1950574241');

// Criar pagamento PIX para cursos
app.post("/criar-pagamento-curso", async (req, res) => {
  const { valor, descricao, email, usuario_id, modalidade, genero, idade } = req.body;

  try {
    const pagamento = await mercadopago.payment.create({
      transaction_amount: parseFloat(valor),
      description: descricao,
      payment_method_id: "pix",
      payer: { email },
      notification_url: "https://23d5-177-107-30-154.ngrok-free.app/webhook",
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

// Inicia o servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});