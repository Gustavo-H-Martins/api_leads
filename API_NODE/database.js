var sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.resolve(__dirname, 'EXTRACAO_DE_LEADS.db')
var db = new sqlite3.Database(dbPath);
module.exports = db
