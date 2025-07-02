const userModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { email, password, pseudo } = req.body;
  if (!email || !password || !pseudo) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: "L'email est déjà utilisé." });

    const newUser = await userModel.createUser({ email, password, pseudo });
    res.status(201).json({ message: 'Utilisateur créé.', user: newUser });
  } catch (error) {
    console.error('Erreur signup:', error.message);
    res.status(500).json({ message: "Erreur serveur lors de l’inscription." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis.' });

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token, pseudo: user.pseudo });
  } catch (error) {
    console.error('Erreur login:', error.message);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};
