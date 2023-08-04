const app = require("../src/app");
const request = require("supertest");
const dataSet = require("./data/transactions.json");

describe("POST /transactions", () => {
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

  describe("When the data is correct:", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/transactions")
        .send(dataSet.dataSet1);
    });

    test("Should respon with a 200 status code", async () =>
      expect(response.statusCode).toEqual(200));

    test("Should respon with the same length", async () => {
      expect(response.body?.length).toEqual(3);
    });

    test("Should gererate an id, and 'vinculada' in false", async () => {
      response.body.forEach((data) => {
        expect(data.id).toBeDefined();
        expect(data.vinculada).toEqual(false);
      });
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
    saldo: -1,
  };

  describe("When the parameters are correct", () => {
    test("Should update and respond with a 200 and the message: Successfully updated", async () => {
      // Create new Transaction
      const newTransaction = await request(app)
        .post("/transactions")
        .send([data]);
      const newData = {
        ...newTransaction.body[0],
        fecha: new Date("06-09-2023 00:00:00"),
        fechaValor: "06/09/2023",
        movimiento: "Movimiento",
        masDatos: "Mas datos",
        importe: 1,
        saldo: 1,
      };

      console.log(newTransaction.body);
      console.log(newData);

      const response = await request(app).patch("/transactions").send(newData);
      const queryGet = await request(app).get(
        `/transactions?linked=false&from=${data.fecha}&to=${data.fecha}`
      );
      const transactionUpdated = queryGet.body?.find(
        (transaction) => transaction.id === data.id
      );

      console.log(response.body);

      expect(response.statusCode).toEqual(200);
      expect(response.body.message).toEqual("Transaction updated successfully");
      expect(transactionUpdated).toEqual(newData);
    });
  });

  describe("When missing parameters", () => {
    // Missing 'id'
    test("Should respon with a 400 and with the message: missing parameter id", async () => {
      // Separate the id from the data
      const { id, ...newData } = data;

      response = await request(app).patch("/transactions").send(newData);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter id");
    });

    // Missing 'fecha'
    test("Should respon with a 400 and with the message: missing parameter fecha", async () => {
      // Separate the fecha from the data
      const { fecha, ...newData } = data;

      response = await request(app).patch("/transactions").send(newData);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter fecha");
    });

    // Missing 'fechaValor'
    test("Should respon with a 400 and with the message: missing parameter fechaValor", async () => {
      // Separate the fechaValor from the data
      const { fechaValor, ...newData } = data;

      response = await request(app).patch("/transactions").send(newData);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter fechaValor");
    });

    // Missing 'importe'
    test("Should respon with a 400 and with the message: missing parameter importe", async () => {
      // Separate the importe from the data
      const { importe, ...newData } = data;

      response = await request(app).patch("/transactions").send(newData);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toEqual("missing parameter importe");
    });

    // Missing 'saldo'
    test("Should respon with a 400 and with the message: missing parameter saldo", async () => {
      // Separate the saldo from the data
      const { saldo, ...newData } = data;

      response = await request(app).patch("/transactions").send(newData);
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
