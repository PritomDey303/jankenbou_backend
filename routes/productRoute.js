const express = require("express");
const {
  productImageMulterUpload,
  productImageCloudinaryUpload,
  productSellingPost,
  updateProductSellingPost,
  deleteProductSellingPost,
} = require("../controllers/productController");
const checkLogin = require("../middlewares/common/checkLogin");
const {
  productValidators,
  productValidatorsHandler,
} = require("../middlewares/product/productValidator");

const router = express.Router();

router.post(
  "/create-post",
  checkLogin,
  productImageMulterUpload,
  productImageCloudinaryUpload,
  productValidators,
  productValidatorsHandler,
  productSellingPost
);

router.put(
  "/update-post/:id",
  productImageMulterUpload,
  productImageCloudinaryUpload,
  productValidators,
  productValidatorsHandler,
  updateProductSellingPost
);
router.delete("/delete-post/:id", deleteProductSellingPost);
router.get("/posts");
module.exports = router;
