const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const {
  addFavori,
  removeFavori,
} = require("../controllers/favoris.controller");

const router = express.Router();

router.post("/", isAuthenticated, addFavori);
router.delete("/:annonce_id", isAuthenticated, removeFavori);

module.exports = router;
