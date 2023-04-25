const app = require("../src/app");
const request = require("supertest");
const invoices = require("./data/invoices.json").servicesInvoice;

describe("POST /invoices/services", () => {
  describe("When the data is correct:", () => {
    test("Should responds with a 200 status code", async () => {
      const response = await request(app)
        .post("/invoices/services")
        .send(invoices[0]);
      expect(response.statusCode).toEqual(200);
    });

    test("Should generate an id", async () => {
      const response = await request(app)
        .post("/invoices/services")
        .send(invoices[1]);
      expect(response.body.id).toBeDefined();
    });

    test("Should responds with a 200 status code", async () => {
      const response = await request(app)
        .post("/invoices/services")
        .send(invoices[1]);
      delete response.body.id;
      expect(response.body).toEqual(invoices[1]);
    });
  });

  /*   describe("When missing parameters:", () => {
    test("Should responds with a 404 status code", async () => {});
  }); */
});
