const mariadb = require('mariadb');

// Pool de conexiones
const pool = mariadb.createPool({
  host: 'localhost',    
  user: 'root',         
  password: '1996',  
  database: 'ecommerce-database', 
  connectionLimit: 5
});

module.exports = pool; 
