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


async function queryDb (query, values) { 
  let res = [];
  let pool = await sql.connect(config);
  let r = await pool.request();
  (values || []).forEach((v, i) => r.input(`_${i + 1}`, v));
  let data = await r.query(query);
  for (let i=0;i<data.rowsAffected;i++){ 
    res.push(data.recordset[i]); 
  }
  pool.close; sql.close; 
  return res; 
} 


router.get("/goals/get/:id", (req, res, next) => {
  const itemId = req.params.id;

  queryDb("SELECT * from Goals where GoalID = @_1", [itemId])
      .then(result=>{
        res.send(result);
      })
      .catch(err=>{
          pool.close;
          sql.close;
          console.log(err)
  })
});



router.get("/employee/get/:id", (req, res, next) => {
  const empId = req.params.id;

  queryDb("SELECT * from Employees where EmpID=@_1", [empId])
      .then(result=>{
        res.send(result);
      })
      .catch(err=>{
          pool.close;
          sql.close;
          console.log(err)
  })
});


router.post('/login',function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  queryDb("SELECT EmpID FROM Employees WHERE email=@_1 AND password=@_2", [email, password])
        .then(result=>{
          res.send(result);
        })
        .catch(err=>{
            pool.close;
            sql.close;
            console.log(err)
        }
)});


module.exports = router;

