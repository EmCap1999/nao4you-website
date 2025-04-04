const express = require("express");
const router = express.Router();
const firebaseAuthController = require("../controllers/firebase.auth.controller");

router.post("/sign-up", firebaseAuthController.SignUp);
router.post("/sign-in", firebaseAuthController.SignIn);
router.delete("/sign-out", firebaseAuthController.SignOut);
router.post("/reset-password", firebaseAuthController.ResetPassword);

module.exports = router;
