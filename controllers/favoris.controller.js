const { createClient } = require("@supabase/supabase-js");

function supabaseWithToken(token) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });
}

exports.addFavori = async (req, res) => {
  const supabase = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const { annonce_id } = req.body;

  if (!annonce_id) {
    return res.status(400).json({ message: "annonce_id manquant." });
  }

  const { error } = await supabase
    .from("favoris")
    .insert([{ user_id, annonce_id }]);

  if (error) {
    console.error("Erreur ajout favori :", error.message);
    return res.status(500).json({ message: "Erreur ajout favori." });
  }

  res.status(201).json({ message: "Favori ajouté." });
};

exports.removeFavori = async (req, res) => {
  const supabase = supabaseWithToken(req.token);
  const user_id = req.user.id;
  const annonce_id = req.params.annonce_id;

  const { error } = await supabase
    .from("favoris")
    .delete()
    .match({ user_id, annonce_id });

  if (error) {
    console.error("Erreur suppression favori :", error.message);
    return res.status(500).json({ message: "Erreur suppression favori." });
  }

  res.status(200).json({ message: "Favori supprimé." });
};
