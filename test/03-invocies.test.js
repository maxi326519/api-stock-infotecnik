const app = require("../src/app");
const request = require("supertest");

describe("GET /invoices", () => {
  test("Should respons width 200 status code", async () => {
    const response = await request(app).get("/invoices").send();
    
    console.log(response.body);
  });
});
