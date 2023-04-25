const app = require("../src/app");
const request = require("supertest");
const invoices = require("./data/invoices.json").servicesInvoice;
const suppliers = require("./data/supplier.json");

describe("POST /invoice/services", () => {
  describe("When the data is correct:", () => {
    test("Should responds with a 200 status code and generate an id", async () => {
      const supplier = await request(app).post("/suppliers").send(suppliers[0]);
      const data = {
        ...invoices[0],
        SupplierId: supplier.body?.id,
      };
      const response = await request(app).post("/invoice/services").send(data);
      await request(app).delete(`/suppliers/${supplier.body?.id}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.id).toBeDefined();
    });

    test("Should responds with a 200 status code", async () => {
      // Post a supplier
      const supplier = await request(app).post("/suppliers").send(suppliers[1]);
      // Add supplier Id
      const data = {
        ...invoices[1],
        SupplierId: supplier.body?.id,
      };
      // Post the invoice
      const response = await request(app).post("/invoice/services").send(data);
      // Delete the supplier
      await request(app).delete(`/suppliers/${supplier.body?.id}`);
      // Delete id's to comparate
      delete response.body.id;
      response.body?.TotalDetails?.forEach((details) => {
        delete details.id;
      });
      expect(response.body).toEqual(data);
    });
  });

  /*   describe("When missing parameters:", () => {
    test("Should responds with a 404 status code", async () => {});
  }); */
});
