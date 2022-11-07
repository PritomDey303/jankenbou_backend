const { check, validationResult } = require("express-validator");
const CloudinaryUploader = require("../../utilityClasses/CloudinaryUploader");

const productValidators = [
  check("name")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must be alphabetic")
    .optional(),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("description")
    .isLength({ min: 3, max: 255 })
    .withMessage("Description must be between 3 and 255 characters"),
  check("price_type")
    .isIn(["fixed", "negotiable", "Fixed", "Negotiable"])
    .withMessage("Price type must be either fixed or negotiable"),
  check("category")
    .isLength({ min: 3, max: 50 })
    .withMessage("Invalid category"),
  check("condition")
    .isIn(["new", "used", "New", "Used", "OLD", "old"])
    .withMessage("Condition must be either new or used"),

  check("seller_name")
    .isLength({ min: 3, max: 50 })
    .withMessage("Invalid seller name")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Seller name must be alphabetic"),
  check("seller_mobile")
    .isMobilePhone("bn-BD")
    .withMessage("Seller mobile must be a valid mobile number"),
  check("seller_messenger")
    .isURL()
    .withMessage("Seller messenger must be a valid URL"),
  check("location")
    .isLength({ min: 3, max: 50 })
    .withMessage("Invalid location"),
  // check("images").isArray({min: 1}).withMessage("Invalid images."),
  //check("user_id").isLength({ min: 3, max: 50 }).withMessage("Invalid user id"),
];

const productValidatorsHandler = async function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    const cloudinaryObj = new CloudinaryUploader();
    await cloudinaryObj.deleteImages(req.productImages);
    return res.json({
      status: 400,
      message: mappedErrors,
    });
  }
};

module.exports = {
  productValidators,
  productValidatorsHandler,
};
