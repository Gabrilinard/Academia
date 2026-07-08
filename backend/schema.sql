-- Schema reconstruído a partir das queries em index.js.
-- Não existia nenhum arquivo .sql versionado no repositório original,
-- então as colunas/tipos aqui são uma aproximação do que o código espera,
-- não uma cópia exata do banco original.

CREATE TABLE IF NOT EXISTS usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  categoria VARCHAR(100),
  preco DECIMAL(10,2) NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  imagem_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS carrinho (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  produto_id INT NOT NULL,
  produto_nome VARCHAR(150),
  produto_preco DECIMAL(10,2),
  quantidade INT NOT NULL DEFAULT 1,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  modalidade VARCHAR(50),
  genero VARCHAR(50),
  idade VARCHAR(50),
  tempo_restante INT DEFAULT 0,
  barra_progresso INT DEFAULT 0,
  checkbox TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS topicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS treinos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  usuario_id INT NOT NULL,
  curso_id INT NOT NULL,
  video VARCHAR(255),
  assistido BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercicios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  video VARCHAR(255),
  mensagem TEXT,
  assistido BOOLEAN NOT NULL DEFAULT FALSE,
  treino_id INT NOT NULL,
  FOREIGN KEY (treino_id) REFERENCES treinos(id) ON DELETE CASCADE
);
