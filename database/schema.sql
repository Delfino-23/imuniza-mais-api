-- ============================================================
-- Imuniza+ — Script de criação do banco de dados
-- Execute este arquivo inteiro em um cliente MySQL
-- (MySQL Workbench, DBeaver, linha de comando, etc.)
-- ============================================================

CREATE DATABASE IF NOT EXISTS imuniza_mais
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE imuniza_mais;

-- ------------------------------------------------------------
-- Tabela: pacientes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabela: vacinas
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vacinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  fabricante VARCHAR(150),
  quantidade_estoque INT NOT NULL DEFAULT 0,
  validade DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabela: postos_saude
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS postos_saude (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  endereco VARCHAR(255),
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabela: agendamentos
-- Relaciona paciente + vacina + posto de saúde
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  vacina_id INT NOT NULL,
  posto_id INT NOT NULL,
  data_agendamento DATETIME NOT NULL,
  status ENUM('agendado', 'concluido', 'cancelado') NOT NULL DEFAULT 'agendado',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_agendamento_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  CONSTRAINT fk_agendamento_vacina FOREIGN KEY (vacina_id) REFERENCES vacinas(id) ON DELETE CASCADE,
  CONSTRAINT fk_agendamento_posto FOREIGN KEY (posto_id) REFERENCES postos_saude(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tabela: historico_vacinal
-- Registra as doses já aplicadas em cada paciente
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS historico_vacinal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  vacina_id INT NOT NULL,
  data_aplicacao DATE NOT NULL,
  dose VARCHAR(50) NOT NULL,
  profissional_responsavel VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_historico_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
  CONSTRAINT fk_historico_vacina FOREIGN KEY (vacina_id) REFERENCES vacinas(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Dados de exemplo (opcional, remova se não precisar)
-- ------------------------------------------------------------
INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, email) VALUES
  ('Ana Souza Silva', '123.456.789-00', '1990-05-15', '(11) 98765-4321', 'ana.souza@email.com'),
  ('Carlos Eduardo Oliveira', '987.654.321-11', '1985-10-22', '(21) 99888-7766', 'carlos.edu@email.com'),
  ('Mariana Costa Reis', '456.789.123-22', '2015-03-08', '(31) 99123-4567', 'mari.costa@email.com');

INSERT INTO vacinas (nome, fabricante, quantidade_estoque, validade) VALUES
  ('COVID-19', 'Pfizer', 500, '2026-12-31'),
  ('Gripe (Influenza)', 'Butantan', 300, '2026-06-30'),
  ('Hepatite B', 'GSK', 200, '2027-01-15');

INSERT INTO postos_saude (nome, endereco, telefone) VALUES
  ('UBS Central', 'Rua das Flores, 100 - Centro', '(11) 3333-1111'),
  ('UBS Vila Nova', 'Av. Brasil, 500 - Vila Nova', '(11) 3333-2222');
