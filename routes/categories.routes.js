const express = require("express");
const router = express.Router();
const supabase = require("../services/supabaseClient");

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération des catégories." });
  }

  res.json(data);
});

module.exports = router;
