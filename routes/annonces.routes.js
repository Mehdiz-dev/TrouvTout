const express = require("express");
const { handleCreateAnnonce } = require("../controllers/annonces.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", isAuthenticated, handleCreateAnnonce);

module.exports = router;
