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
router.route("/estabelecimentos")
    .get(function(req, res, next){
        const clientIp = req.ip;
        const bandeira = req.query.bandeira ? [req.query.bandeira.toUpperCase()] : null;
        const uf = req.query.uf ? [req.query.uf.toUpperCase()] : null;
        const cidade = req.query.cidade ? [req.query.cidade.toUpperCase().replace(/-/g, ' ')] : null;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 100;
        const offset = (page - 1) * pageSize;

        let query = `SELECT * FROM EXTRAÇÃO_DE_LEADS`;
        let conditions = [];
        if (bandeira) conditions.push(`BANDEIRA = "${bandeira}"`);
        if (uf) conditions.push(`Estado = "${uf}"`);
        if (cidade) conditions.push(`Municipio = "${cidade}"`);
        if (conditions.length > 0) query += ` WHERE ${conditions.join(' AND ')}`;
        query += ` LIMIT ? OFFSET ?`;
        
        db.all(query, [pageSize, offset], (err, rows) => {
            if (err){
                res.status(500).json({error: err.message});
                return;
            }   
            console.log(query)
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

// Lista de Estabelecimentos por Estado
router.route("/estabelecimentos/bandeira=all/estado=:uf")
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
router.route("/estabelecimentos/bandeira=:bandeira/estado=all") 
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
router.route("/estabelecimentos/bandeira=:bandeira/estado=:uf")
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
router.route("/estabelecimentos/bandeira=:bandeira/estado=:uf/cidade=:cidade")
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