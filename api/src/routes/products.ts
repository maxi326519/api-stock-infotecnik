const router = require("express").Router();
const {
  setProducts,
  getproducts,
  updateProducts,
  disabledProduct,
} = require("./controllers/products");

router.get("/", (req: any, res: any) => {
  try {
    res.status(200).json({ msg: "/products/get" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/", (req: any, res: any) => {
  try {
    res.status(200).json({ msg: "/products/post" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
