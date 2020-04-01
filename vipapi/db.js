// 导入mysql
const mysql = require("mysql")
const config = require("./config")
const connection = mysql.createConnection(config.db)
connection.connect()
//导出
module.exports = connection