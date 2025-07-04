const { createAnnonce } = require("../models/annonces.model");
const { createClient } = require("@supabase/supabase-js");

async function handleCreateAnnonce(req, res) {
  const user = req.user;
  const token = req.token;
  const { titre, description, prix, localité, category_id } = req.body;

  if (!titre || !description || !prix || !localité || !category_id) {
    return res.status(400).json({ message: "Champs requis manquants." });
  }

  try {
    const annonce = await createAnnonce({
      titre,
      description,
      prix,
      localité,
      category_id,
      user_id: user.id,
      token,
    });

    res.status(201).json(annonce);
  } catch (err) {
    console.error("Erreur création annonce :", err);
    res.status(500).json({
      message: "Erreur lors de la création de l'annonce.",
      error: err.message,
    });
  }
}

async function getAllAnnonces(req, res) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from("annonces")
    .select("*");

  if (error) {
    console.error("Erreur récupération annonces :", error.message);
    return res.status(500).json({ message: "Erreur récupération annonces." });
  }

  res.json(data);
}

module.exports = {
  handleCreateAnnonce,
  getAllAnnonces
};
