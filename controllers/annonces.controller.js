const { createAnnonce } = require("../models/annonces.model");

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

module.exports = { handleCreateAnnonce };
