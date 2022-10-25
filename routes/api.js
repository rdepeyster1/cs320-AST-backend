var express = require('express');
var router = express.Router();
const sql = require('mssql');

var config = {
  user: 'Cytosios_SQLLogin_1',
  password: 'kgjmjonljv',
  server: 'AST-320.mssql.somee.com',
  database: 'AST-320',
  trustServerCertificate: true
}

sql.connect(config, function(err){
  if (err) console.log(err.message);

  var request = new sql.Request();
           
  // query to the database and get the records
  request.query('select * from goals', function (err, recordset) {
      
      if (err) console.log(err)

      // send records as a response
      console.log(recordset);      
  });
})

module.exports = router;




