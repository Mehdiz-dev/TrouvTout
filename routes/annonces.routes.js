const express = require("express");
const { handleCreateAnnonce } = require("../controllers/annonces.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { getAllAnnonces } = require("../controllers/annonces.controller");

const router = express.Router();

router.get("/", getAllAnnonces);

router.post("/", isAuthenticated, handleCreateAnnonce);

module.exports = router;
