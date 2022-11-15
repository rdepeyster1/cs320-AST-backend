# cs320-AST-backend

API Documentation:
https://docs.google.com/document/d/1PtI-Trdlia_1C4Jmutq4ccKwFGATEja3VKhF80jQ8-E/edit

API
Route
Returns
GET API: Get goal information given Goal ID
http://localhost:9000/api/goals/get/{id}  

Parameter: id=1
Result : JSON OBJECT
[
   {
       "GoalID": 1,
       "EmpID": 1,
       "StartDate": "2022-01-01T00:00:00.000Z",
       "EndDate": "2022-02-01T00:00:00.000Z",
       "Description": "To be the most successful CEO in the world",
       "GoalType": "Personal",
       "Status": "Inactive",
       ”goalname”: "Goal 1”
 
   }
]
POST API: create goal for an employee using their EmpID
http://localhost:9000/api/goals/create
Body: JSON OBJECT
Parameters
{
"empid": "1",
"startdate": "07-01-2022",
"enddate": "08-01-2022",
"description": "Make more money",
"goaltype": "Personal",
"status": "Active"
”goalname”: ”goal 1”
}
 

 
Result : JSON object of the goalId of the created goal
{
    "goalid": 8
}
GET API: goal information from employee
http://localhost:9000/api/employee/get/{id}

Parameter: id = 1
Result : JSON OBJECT

[
   {
       "EmpID": 1,
       "ManagedBy": null,
       "Password": "cunninghamge",
       "Firstname": "Gerald",
       "Lastname": "Cunningham",
       "Email": "Gerald_Cunningham@fluffybunnyconsulting.com",
       "CompanyID": 1,
       "CompanyName": "Fluffy Bunny Consulting",
       "StartDate": "2018-09-22T00:00:00.000Z",
       "Position": "CEO"
   }
]
POST API: try to login using employee’s email and password


 http://localhost:9000/api/login

Body: JSON OBJECT
Parameter

{
   "email": "Gerald_Cunningham@fluffybunnyconsulting.com",
   "password": "cunninghamge"
}  
Result: JSON OBJECT (return empID with corresponding email and password in database)
 
[
   {
       "EmpID": 1
   }
]
GET API: get all goalID from employee’s id (empID)
http://localhost:9000/api/goals/getAllGoals/{id}

Parameter: id = 1
Result: JSON OBJECT (return all goalID from empID)
[
   {
       "GoalID": 1
   },
   {
       "GoalID": 3
   },
   {
       "GoalID": 4
   },
   {
       "GoalID": 5
   }
]
GET API: get comment information from comment’s id (commentID)
http://localhost:9000/api/comments/get/{id}

Parameter: id = 1
Result: JSON OBJECT (return comment information from commentID)
 
[
   {
       "CommentID": 1,
       "GoalID": 1,
       "EmpID": 1,
       "CommentDescription": "This goal was too hard."
   }
]
GET API: get all empID from managedID
http://localhost:9000/api/manager/get/{id}

Parameter: id = 1
Result: JSON OBJECT

[
   {
       "empID": 2
   },
   {
       "empID": 4
   },
   {
       "empID": 6
   },
   {
       "empID": 9
   }
]
POST API: 
http://localhost:9000/api/comments/create
{
“goalid”: “1”
“empid”: “1”
“description”: “my name is chetan”
}
{
    "commentid": 8
}
 
 
 
POST API:
http://localhost:9000/api/goals/update

Body:

{
"goalid": "2",
"newstatus": "Active"
}




[]

 








Example POST API call using the fetch() method

const response = await fetch('http://localhost:9000/api/login', {
                  method: 'POST',
                  body: JSON.stringify({email: username, password: password}),
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
                });
                

       response.json().then((data) => console.log(data));


In this case, an array of empId would be printed to the console. We pass username and password to this API as a JSON object. This is how we would go about posting a request to the backend with a JSON object.

Example GET API call using the fetch() method 

  const response = await fetch(`http://localhost:9000/api/goals/get/{id}`);
  const goal = response.json();


GET calls are far simpler. The complexity of this might originate from correctly parsing the JSON object so we can interpret it on the frontend and display according to spec. 
