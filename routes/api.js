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

queryDb("SELECT MAX(goalid) as mgi from Goals").then(result=>{console.log(result)})

router.post("/goals/create", (req, res, next) => {
  queryDb("SELECT MAX(goalid) as mgi from Goals")
      .then(result=>{
        const goalid = result.mgi + 1;
        const empid = req.params.empid;
        const startdate = req.params.startdate;
        const enddate = req.params.enddate;
        const description = req.params.description;
        const goaltype = req.params.goaltype;
        const status = req.params.status;

        const goalinfo = [goalid, empid, startdate, enddate, description, goaltype, status];

        queryDb("INSERT INTO GOALS VALUES(@_1, @_2, @_3, @_4, @_5, @_6, @_7)", goalinfo)
        .catch(err=>{
          pool.close
          sql.close();
          console.log(err);
        })
      })
      .catch(err=>{
        pool.close;
        sql.close;
        console.log(err);
  })
})

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

