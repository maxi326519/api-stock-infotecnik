const app = require("../src/app");
const request = require("supertest");
const supplierData = require("./data/supplier.json");

describe("POST /suppliers", () => {
  describe("When the data is correct:", () => {
    test("Should respon with a 200 status code", async () => {
      const response = await request(app)
        .post("/suppliers")
        .send(supplierData[0]);
      expect(response.statusCode).toEqual(200);
    });

    test("Should gererate an id", async () => {
      const response = await request(app)
        .post("/suppliers")
        .send(supplierData[1]);
      expect(response.body.id).toBeDefined();
    });

    test("Should respon with the same object", async () => {
      const response = await request(app)
        .post("/suppliers")
        .send(supplierData[2]);
      delete response.body.id;
      expect(response.body).toEqual(supplierData[2]);
    });
  });

  describe("When missing parameters:", () => {
    test("Should respond with a 404 status code", async () => {
      const numero = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], numero: undefined });
      const nombre = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], nombre: undefined });
      const direccion = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], direccion: undefined });
      const poblacion = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], poblacion: undefined });
      const cifNif = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], cifNif: undefined });
      const telefono = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], telefono: undefined });
      expect(numero.statusCode).toEqual(404);
      expect(nombre.statusCode).toEqual(404);
      expect(direccion.statusCode).toEqual(404);
      expect(poblacion.statusCode).toEqual(404);
      expect(cifNif.statusCode).toEqual(404);
      expect(telefono.statusCode).toEqual(404);
    });

    test("Should respond with a message like: missing parameter (parameter)", async () => {
      const numero = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], numero: undefined });
      const nombre = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], nombre: undefined });
      const direccion = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], direccion: undefined });
      const poblacion = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], poblacion: undefined });
      const cifNif = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], cifNif: undefined });
      const telefono = await request(app)
        .post("/suppliers")
        .send({ ...supplierData[0], telefono: undefined });

      expect(numero.body).toEqual("missing parameter (numero)");
      expect(nombre.body).toEqual("missing parameter (nombre)");
      expect(direccion.body).toEqual("missing parameter (direccion)");
      expect(poblacion.body).toEqual("missing parameter (poblacion)");
      expect(cifNif.body).toEqual("missing parameter (cifNif)");
      expect(telefono.body).toEqual("missing parameter (telefono)");
    });
  });
});

describe("GET /suppliers", () => {
  test("Should respond with supplier array", async () => {
    const response = await request(app).get("/suppliers").send();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toEqual(3);
  });
});
