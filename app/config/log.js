// app/config/log.js
/**
* libs
*/
const db = require('./db');
const timestamp = 1616959727269; // exemplo de timestamp

const date = new Date(timestamp); // cria um objeto Date a partir do timestamp

const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // formata a data como DD/MM/AAAA

const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // formata a hora como HH:MM:SS

console.log(`Data: ${formattedDate} - Hora: ${formattedTime}`); // exibe a data e hora formatadas

// Função registra log
function logToDatabase(clientIP, message, level, timestamp) {
    const log = { clientIP, message, level, timestamp };
    db.get('SELECT 1 FROM logs LIMIT 1', (err, res) => {
      if (err) {
        // Se ocorrer um erro na consulta, a tabela não existe
        // Criar a tabela com a estrutura apropriada
        db.run(`
          CREATE TABLE logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            clientIP VARCHAR(50),
            message VARCHAR(255),
            level VARCHAR(50),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `, (err, res) => {
          if (err) throw err;
          // Após a tabela ser criada, inserir o registro na tabela
          db.run('INSERT INTO logs (clientIP, message, level, timestamp) VALUES (?, ?, ?, ?)', [clientIP, message, level, timestamp], (err, res) => {
            if (err) throw err;
          });
        });
      } else {
        // Se a tabela existe, inserir o registro na tabela
        db.run('INSERT INTO logs (clientIP, message, level, timestamp) VALUES (?, ?, ?, ?)', [clientIP, message, level, timestamp], (err, res) => {
            if (err) throw err;
          });
      }
    });
  }
  
  module.exports = logToDatabase;

