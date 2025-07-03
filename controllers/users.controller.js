const supabase = require('../services/supabaseClient');
const userModel = require('../models/users.model');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const user = data.user;
    const session = data.session;

    const profile = await userModel.getProfileById(user.id); //infos profil

    res.status(200).json({
      message: 'Connexion réussie.',
      user: {
        id: user.id,
        email: user.email,
        pseudo: profile?.pseudo || null,
      },
      token: session.access_token, // token a garder coté front pour requetes protégées ?
    });
  } catch (err) {
    console.error('Erreur login:', err.message);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};


exports.signup = async (req, res) => {
  const { email, password, pseudo } = req.body;

  if (!email || !password || !pseudo) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const user = await userModel.signupUser(email, password, pseudo);

    res.status(201).json({
      message: 'Inscription réussie.',
      user,
    });
  } catch (err) {
    console.error('Erreur signup:', err.message);
    res.status(500).json({ message: 'Erreur serveur lors de l’inscription.' });
  }
};
