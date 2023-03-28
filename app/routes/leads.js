//app/routes/leads.js
/**
 * Libs
 */
const db = require('../config/db');
const logToDatabase = require ('../config/log')
const router = require('express').Router();
/**
 * Conexão com o DB
 */

/**
 * Router - estrutura
 */

// GetAll
router.route('/all/:page/:pageSize')
  .get(function(req, res, next) {
    // definindo encoding da resposta da api
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    }
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers)
      res.end()
      return
    }
    const clientIp = req.ip;
    const page = parseInt(req.params.page);
    const pageSize = parseInt(req.params.pageSize);
    const offset = (page - 1) * pageSize;
    const query = `SELECT * FROM EXTRAÇÃO_DE_LEADS LIMIT ? OFFSET ?;`;

    db.all(query, [pageSize, offset], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Erro no servidor interno da api!' });
        return;
      }
        // Formatando data e hora para incluir no log
        const date = new Date()
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // formata a data como DD/MM/AAAA
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // formata a hora como HH:MM:SS
        dataChamada = `Data: ${formattedDate} - Hora: ${formattedTime}`
        logToDatabase(clientIp,`Retornando ${rows.length} dados, para o ip: ${ip}`, 'INFO', new Date())
        res.json(rows);
    });
  });

// Lista de Estabelecimentos por Estado
router.route("/bandeira=all/estado=:uf")
    .get(function(req, res, next) {
        const estado = [req.params.uf.toUpperCase()]
        const clientIp = req.ip;
        const query = `SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE Estado = "${estado}";`
        db.all(query, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }   
                // Formatando data e hora para incluir no log
                const date = new Date()
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // formata a data como DD/MM/AAAA
                const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // formata a hora como HH:MM:SS
                dataChamada = `Data: ${formattedDate} - Hora: ${formattedTime}`
                logToDatabase(clientIp,`Retornando ${rows.length} dados do ${estado}`, 'INFO', new Date())
                res.status(200).json(
                    rows
                );
        });
})
// Lista de Estabelecimentos por Bandeira de cartão
router.route("/bandeira=:bandeira/estado=all") 
    .get(function(req, res, next) {
        const clientIp = req.ip;
        const bandeira = [req.params.bandeira.toUpperCase()]
        const query = `SELECT *  FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = "${bandeira}"`
        db.all(query, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
                // Formatando data e hora para incluir no log
                const date = new Date()
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // formata a data como DD/MM/AAAA
                const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // formata a hora como HH:MM:SS
                dataChamada = `Data: ${formattedDate} - Hora: ${formattedTime}`
                logToDatabase(clientIp,`Retornando ${rows.length} dados de ${bandeira}`, 'INFO', new Date())
                res.status(200).json(
                rows
                );
        });
})

// Lista de Estabelecimentos por Bandeira e Estado
router.route("/bandeira=:bandeira/estado=:uf")
    .get(function(req, res, next){
        const clientIp = req.ip;
        const bandeira = [req.params.bandeira.toUpperCase()]
        const uf = [req.params.uf.toUpperCase()]
        const query = `SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = "${bandeira}" AND Estado = "${uf}"` 
        db.all(query, (err, rows) => {
            if (err){
                res.status(500).json({error: err.message});
                return;
            }
                // Formatando data e hora para incluir no log
                const date = new Date()
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // formata a data como DD/MM/AAAA
                const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // formata a hora como HH:MM:SS
                dataChamada = `Data: ${formattedDate} - Hora: ${formattedTime}`
                logToDatabase(clientIp,`Retornando ${rows.length} dados de ${bandeira} no estado de ${uf}`,'INFO', new Date())
                res.status(200).json(
                    rows
                );
        });
    })
// Lista de Estabelecimentos por Bandeira, Estado e Município
router.route("/bandeira=:bandeira/estado=:uf/cidade=:cidade")
    .get(function(req, res, next){
        const clientIp = req.ip;
        const bandeira = [req.params.bandeira.toUpperCase()]
        const uf = [req.params.uf.toUpperCase()]
        const cidade = [req.params.cidade.toUpperCase().replace(/-/g, ' ')]
        const query = `SELECT * FROM EXTRAÇÃO_DE_LEADS WHERE BANDEIRA = "${bandeira}" AND Estado = "${uf}" AND Municipio = "${cidade}"`
        db.all(query, (err, rows) => {
            if (err){
                res.status(500).json({error: err.message});
                return;
            }   
                // Formatando data e hora para incluir no log
                const date = new Date()
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // formata a data como DD/MM/AAAA
                const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // formata a hora como HH:MM:SS
                dataChamada = `Data: ${formattedDate} - Hora: ${formattedTime}`
                logToDatabase(clientIp,`Retornando ${rows.length} dados de "${bandeira}" no estado de "${uf}" município de ${cidade}`, 'INFO', dataChamada)
                res.status(200).json(
                    rows
                );
        });
    })
module.exports = router;