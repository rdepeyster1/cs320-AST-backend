const request = require("supertest");
const app = require("./app");

describe("Test all the goal API", () => {
  test("GET api with goal id", done => {
    request(app)
      .get("/api/goals/get/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        console.log("abc")
        console.log(response._body[0]);
        object = response._body[0];
        expect(object.GoalID).toBe(1);
        expect(object.EmpID).toBe(1);
        done();
      });
  });

  test("GET api with all goal from empID", done => {
    request(app)
      .get("/api/goals/getAllGoals/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        console.log(response);
        object = response._body;
        expect(Object.keys(object).length).toBe(9);
        // expect(object.EmpID).toBe(1);
        done();
      });
  });

  test("Test the update API for goal", done => {
    request(app)
      .post("/api/goals/update")
      .send({
        "newstatus": "inactive",
        "goalid": "1"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);

        request(app)
        .get("/api/goals/get/1")
        .then(response => {
          expect(response.statusCode).toBe(200);

          object = response._body[0];
          console.log(object)
          expect(object.GoalID).toBe(1);
          expect(object.EmpID).toBe(1);
          expect(object.Status).toBe("inactive")
          done();
        });
      });
  })

});
describe("Tests all the Employee APIs", () => {
  test("Tests getting employee information", done => {
    request(app)
      .get("/api/employee/get/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        object = response._body[0];
        expect(Object.keys(object).length).toBe(10);
        done();
      });
  });
  test("Check successful login", done => {
    request(app)
      .post("/api/login")
      .send({"email": "Gerald_Cunningham@fluffybunnyconsulting.com",
    "password": "cunninghamge"})
      .then(response => {
        expect(response.statusCode).toBe(200);
        object = response._body[0];
        expect(Object.keys(object).length).toBe(1);
        done();
      });
  });
  test("Get manager function", done => {
    request(app)
    .get("/api/manager/get/1")
    .then(response => {
      expect(response.statusCode).toBe(200);
      object = response._body;
      expect(Object.keys(object).length).toBe(4);
      done();
    });
  });
});

describe("Tests all the Comments APIs", () => {
  test("Tests getting all comments information", done => {
    request(app)
      .get("/api/comments/getAllComments/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        object = response._body;
        expect(Object.keys(object).length).toBe(6);
        done();
      });
  });

  test("Tests getting single comment information", done => {
    request(app)
      .get("/api/comments/get/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        object = response._body;
        expect(Object.keys(object).length).toBe(1);
        done();
      });
  });

  test("Check successful comment creation", done => {
    request(app)
      .post("/api/comments/create")
      .send({
        "empid": "1",
        "goalid": "2",
        "description": "Test comment creation"
        })
      .then(response => {
        expect(response.statusCode).toBe(200);
        console.log(response._body);
        object = response._body;
        expect(Object.keys(object).length).toBe(1);
        id = object.commentid;

        request(app)
        .get("/api/comments/get/" + id)
        .then(response => {
          expect(response.statusCode).toBe(200);
          object = response._body;
          expect(Object.keys(object).length).toBe(1);
          done();
        });
      });
  });
});

test("Get manager function", done => {
  request(app)
  .get("/api/manager/get/1")
  .then(response => {
    expect(response.statusCode).toBe(200);
    object = response._body;
    expect(Object.keys(object).length).toBe(4);
    done();
  });
});