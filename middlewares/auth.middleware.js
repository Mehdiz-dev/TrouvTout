const supabase = require("../services/supabaseClient");

async function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide." });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(403).json({ message: "Utilisateur non authentifié." });
  }
  console.log("Utilisateur connecté via token :", data.user.id);


  req.user = data.user;
  req.token = token;
  next();
}

module.exports = { isAuthenticated };
