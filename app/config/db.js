// app/config/db.js (Camada Config)
/**
 * Libs
 */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile =  `${__dirname}`.replace('config', 'files/EXTRACAO_DE_LEADS.db')
// Configuração do servidor
// const dbFile = require('./variaveisAmbiente')
// Conectar ao banco de dados SQLite3
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('conectado no banco de dados "EXTRACAO_DE_LEADS".');
});

module.exports = db;