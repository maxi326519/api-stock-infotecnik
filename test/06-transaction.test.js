const app = require("../src/app");
const request = require("supertest");
const dataSet = require("./data/transactions.json");

describe("POST /transactions", () => {
  describe("When the data is correct:", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/transactions")
        .send(dataSet.dataSet1);
    });

    test("Should respon with a 200 status code", () =>
      expect(response.statusCode).toEqual(200));

    test("Should respon with the same length", () => {
      expect(response.body?.length).toEqual(3);
    });

    test("Should gererate an id, and 'vinculada' in false", () => {
      response.body.forEach((data) => {
        expect(data.id).toBeDefined();
        expect(data.vinculada).toEqual(false);
      });
    });
  });

  describe("When missing parameters", () => {
    // Missing 'fecha'
    test("Should respon with a 400 and with the message: missing parameter fecha", async () => {
      response = await request(app)
        .post("/transactions")
        .send([dataSet.dataSetErrors[0]]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter fecha");
    });

    // Missing 'fechaValor'
    test("Should respon with a 400 and with the message: missing parameter fechaValor", async () => {
      response = await request(app)
        .post("/transactions")
        .send([dataSet.dataSetErrors[1]]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter fechaValor");
    });

    // Missing 'importe'
    test("Should respon with a 400 and with the message: missing parameter importe", async () => {
      response = await request(app)
        .post("/transactions")
        .send([dataSet.dataSetErrors[2]]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter importe");
    });

    // Missing 'saldo'
    test("Should respon with a 400 and with the message: missing parameter saldo", async () => {
      response = await request(app)
        .post("/transactions")
        .send([dataSet.dataSetErrors[3]]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter saldo");
    });
  });

  describe("When post the same data", () => {
    // Missing 'fecha'
    test("Should respon with a empty array", async () => {
      response = await request(app)
        .post("/transactions")
        .send(dataSet.dataSet1);
      expect(response.statusCode).toEqual(200);
      expect(response.body?.length).toEqual(0);
    });
  });
});

describe("PATCH /transactions", () => {
  // data
  let data = {
    id: "test",
    ...dataSet.dataSet1[1],
  };

  describe("When the parameters are correct", () => {
    // Post data

    test("If linked is 'true' should respond with a 200 and only linked data", async () => {
      await request(app).post("/transactions").send(data);
      response = await request(app)
        .post("/transactions?linked=true")
        .send(dataSet.dataSet1);
    });
  });

  describe("When missing parameters", () => {
    // Missing 'id'
    test("Should respon with a 400 and with the message: missing parameter id", async () => {
      // Separate the id from the data
      const { id, ...newData } = data;

      response = await request(app).post("/transactions").send([newData]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter fecha");
    });

    // Missing 'fecha'
    test("Should respon with a 400 and with the message: missing parameter fecha", async () => {
      // Separate the fecha from the data
      const { fecha, ...newData } = data;

      response = await request(app).post("/transactions").send([newData]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter fecha");
    });

    // Missing 'fechaValor'
    test("Should respon with a 400 and with the message: missing parameter fechaValor", async () => {
      // Separate the fechaValor from the data
      const { fechaValor, ...newData } = data;

      response = await request(app).post("/transactions").send([newData]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter fechaValor");
    });

    // Missing 'importe'
    test("Should respon with a 400 and with the message: missing parameter importe", async () => {
      // Separate the importe from the data
      const { importe, ...newData } = data;

      response = await request(app).post("/transactions").send([newData]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter importe");
    });

    // Missing 'saldo'
    test("Should respon with a 400 and with the message: missing parameter saldo", async () => {
      // Separate the saldo from the data
      const { saldo, ...newData } = data;

      response = await request(app).post("/transactions").send([newData]);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter saldo");
    });
  });
});

/* describe("GET /transactions", () => {
  describe("When the parameters are correct", () => {
    test("If linked is 'true' should respond with a 200 and only linked data", async () => {
      response = await request(app)
        .post("/transactions?linked=true")
        .send(dataSet.dataSet1);
    });
  });
}); */

/* describe("DELETE /transactions", () => {
  test("Should respond with a 200 and message: Transaction successfully deleted", async () => {
    response = await request(app).delete(
      `/transactions/${dataSet.dataSet1[0].id}`
    );
  });
}); */
