/**
 * Routes: Users / Auth
 * host + /api/auth
 */
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/fieldValidator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/jwtValidator");

//' login
router.post(
  "/",
  [
    check("email", "Email required").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

//' register
router.post(
  "/new",
  [
    check("name", "Name required").not().isEmpty(),
    check("email", "Email required").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    validateFields,
  ],
  createUser
);

//' renew token
router.get("/renew", validateJWT, renewToken);

module.exports = router;
