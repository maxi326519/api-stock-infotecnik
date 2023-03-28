const routerLogin = require("express").Router();
const verification = require("express").Router();

verification.use((req: any, res: any, next: any) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    res.status(400).send({ error: "missin token" });
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, server.get("key"), (error: any, decoded: any) => {
      if (error) {
        return res.json({ message: "token invalid" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

routerLogin.post("/", (req: any, res: any) => {
  const { email, password } = req.body;

  if (email === "maxi.326519@gmail.com" && password === "12345678") {
    const token = jwt.sign(
      { check: true, email: "maxi.326519@gmail.com" },
      server.get("key"),
      {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 24,
      }
    );

    res.cookie("my-cookie", token);
    res.status(200).json({ mensage: "Login successfully" });
  } else {
    res.status(400).json({ error: "invalid credentials" });
  }
});

module.exports = {
    routerLogin,
    verification
}