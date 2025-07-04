require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const supabase = require('./services/supabaseClient');

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes API
const annoncesRoutes = require("./routes/annonces.routes");
const categoriesRoutes = require("./routes/categories.routes");
const favorisRoutes = require("./routes/favoris.routes");
app.use("/api/categories", categoriesRoutes);
app.use("/api/annonces", annoncesRoutes);
app.use("/api/favoris", favorisRoutes);
app.use('/api/users', require('./routes/users.routes'));

//Serveur
app.listen(3000, () => {
  console.log("Serveur en écoute sur le port 3000");
});
