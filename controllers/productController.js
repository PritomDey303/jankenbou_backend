const Product = require("../models/productSchema");
const ProductQuery = require("../utilityClasses/ProductQuery");
const MulterUploader = require("../utiltyFunctions/multerUploader");
const CloudinaryUploader = require("../utilityClasses/CloudinaryUploader");
const fs = require("fs");
//creating object of ProductQuery
const productObj = new ProductQuery(Product);

//product image upload through multer
async function productImageMulterUpload(req, res, next) {
  try {
    console.log(req.files);
    const upload = await MulterUploader.uploader(
      "images",
      ["image/jpeg", "image/jpg", "image/png", "image/gif"],
      500000,
      "Only .jpg, jpeg, .gif or .png format allowed!"
    );

    upload.array("images")(req, res, (err) => {
      if (err) {
        res.json({
          status: 500,
          message: err.message,
        });
      } else {
        next();
      }
    });
  } catch (err) {
    res.json({
      status: 500,
      message: "Error in event image upload",
    });
  }
}

//product image cloudinary upload
async function productImageCloudinaryUpload(req, res, next) {
  console.log(req.files);
  try {
    const uploader = new CloudinaryUploader();
    if (req.method === "POST" || req.method === "PUT") {
      const urls = [];

      for (let file of req.files) {
        const { path } = file;
        const newPath = await uploader.uploadImage(path, "jankenbou/images");
        console.log(newPath);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      req.productImages = urls;
      console.log(urls);
      next();
    } else {
      res.json({
        status: 405,
        message: "Images not uploaded successfully.",
      });
    }
  } catch (err) {
    for (let file of req.files) {
      const { path } = file;
      fs.unlinkSync(path);
    }
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

//product selling post
async function productSellingPost(req, res, next) {
  const uploader = new CloudinaryUploader();

  try {
    const productData = await productObj.insertData({
      ...req.body,
      images: req.productImages,
      user_id: req.user.uid,
    });

    res.json({
      status: 200,
      message: "Selling post created successfully.",
      data: productData,
    });
  } catch (err) {
    console.log(err.message);
    await uploader.deleteImages(req.productImages);
    res.json({
      status: 500,
      message: "Error in creating selling post.",
    });
  }
}

//update selling post
async function updateProductSellingPost(req, res, next) {
  const uploader = new CloudinaryUploader();

  try {
    //new product data
    const newProductData = await productObj.findDataById(req.params.id);
    let product_img = [];
    if (req.productImages.length > 0) {
      product_img = req.productImages;
    } else {
      product_img = newProductData.images;
    }
    const productData = await productObj.updateDataById(req.params.id, {
      ...req.body,
      images: product_img,
      // user_id: req.user.uid,
    });
    //delete previous images from cloudinary
    await uploader.deleteImages(newProductData.images);
    res.json({
      status: 200,
      message: "Selling post updated successfully.",
      data: productData,
    });
  } catch (err) {
    console.log(err.message);
    //delete current images from cloudinary
    await uploader.deleteImages(req.productImages);
    res.json({
      status: 500,
      message: "Error in updating selling post.",
    });
  }
}

//delete selling post
async function deleteProductSellingPost(req, res, next) {
  const uploader = new CloudinaryUploader();
  try {
    const productData = await productObj.findDataById(req.params.id);
    await productObj.deleteDataById(req.params.id);
    await uploader.deleteImages(productData.images);
    res.json({
      status: 200,
      message: "Selling post deleted successfully.",
      data: productData,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: "Error in deleting selling post.",
    });
  }
}
//get all products

module.exports = {
  productImageMulterUpload,
  productImageCloudinaryUpload,
  productSellingPost,
  updateProductSellingPost,
  deleteProductSellingPost,
};
