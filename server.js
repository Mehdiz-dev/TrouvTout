require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const supabase = require('./services/supabaseClient');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/users.routes'));

app.listen(3000, () => {
  console.log("Serveur en écoute sur le port 3000");
});
