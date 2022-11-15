const request = require("supertest");
const app = require("./app");

describe("Test all the goal API", () => {
  test("GET api with goal id", done => {
    request(app)
      .get("/api/goals/get/1")
      .then(response => {
        // expect(response.statusCode).toBe(200);
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
        expect(Object.keys(object).length).toBe(4);
        // expect(object.EmpID).toBe(1);
        done();
      });
  });

});