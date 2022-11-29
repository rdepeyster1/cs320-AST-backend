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
  if (data.recordset){
    for (let i=0;i<data.rowsAffected;i++){ 
      res.push(data.recordset[i]); 
    }
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
        res.status(500).send({"Error": err});
  })
});

router.post("/goals/create", (req, res, next) => {
  const empid = parseInt(req.body.empid);
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const description = req.body.description;
  const goaltype = req.body.goaltype;
  const status = req.body.status;
  const goalname = req.body.goalname
  queryDb("SELECT MAX(goalid) as mgi from Goals")
      .then(result=>{
        const goalid = result[0].mgi + 1;
        const goalinfo = [goalid, empid, startdate, enddate, description, goaltype, status, goalname];
        console.log(goalinfo)
        queryDb("INSERT INTO GOALS VALUES(@_1, @_2, @_3, @_4, @_5, @_6, @_7, @_8)", goalinfo);
        res.send({"goalid": goalid})
      })
      .catch(err=>{
        res.status(500).send({"Error": err});
  })
})

router.post("/comments/create", (req, res, next) => {
  const goalid = parseInt(req.body.goalid);
  const empid = parseInt(req.body.empid);
  const description = req.body.description;
  queryDb("SELECT MAX(commentid) as mgi from comments")
      .then(result=>{
        const commentid = parseInt(result[0].mgi) + 1;
        const commentinfo = [commentid, goalid, empid, description];
        console.log(commentinfo)
        queryDb("INSERT INTO COMMENTS VALUES(@_1, @_2, @_3, @_4)", commentinfo);
        res.send({"commentid": commentid})
      })
      .catch(err=>{
        res.status(500).send({"Error": err});
  })
})

router.get("/employee/get/:id", (req, res, next) => {
  const empId = req.params.id;

  queryDb("SELECT * from Employees where EmpID=@_1", [empId])
      .then(result=>{
        res.send(result);
      })
      .catch(err=>{
        res.status(500).send({"Error": err});
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
          res.status(500).send({"Error": err});
        }
)});

router.get("/goals/getAllGoals/:id", (req, res, next) => {
  const itemId = req.params.id;

  queryDb("SELECT GoalID from Goals where EmpID in (SELECT empid from employees where empid = @_1 or managedby = @_1)", [itemId])
      .then(result=>{
        res.send(result);
      })
      .catch(err=>{
        res.status(500).send({"Error": err});
  })
});

router.get("/comments/getAllComments/:id", (req, res, next) => {
  const itemId = req.params.id;

  queryDb("SELECT commentID from Comments where GoalID = @_1", [itemId])
      .then(result=>{
        res.send(result);
      })
      .catch(err=>{
        res.status(500).send({"Error": err});
  })
});

router.get("/comments/get/:id", (req, res, next) => {
  const itemId = req.params.id;

  queryDb("SELECT * from Comments where commentID = @_1", [itemId])
      .then(result=>{
        res.send(result);
      })
      .catch(err=>{
        res.status(500).send({"Error": err});
  })
});

router.get("/manager/get/:id", (req, res, next) => {
  const itemId = req.params.id;

  queryDb("SELECT empID from Employees where managedBy = @_1", [itemId])
      .then(result=>{
        res.send(result);
      })
      .catch(err=>{
        res.status(500).send({"Error": err});
  })
});


//Update the status of a goal
router.post("/goals/update", function(req,res){
  var newStatus = req.body.newstatus;
  var itemId = parseInt(req.body.goalid);
  queryDb("UPDATE Goals SET Status = @_1 WHERE GoalID = @_2", [newStatus, itemId])
        .then(result=>{
          res.send(result);
        })
        .catch(err=>{
          res.status(500).send({"Error": err});
        }
)});

module.exports = router;