const express = require('express');
const cors = require('cors');  // Importer le module CORS
const app = express();
const revisionRoutes = require('./routes/revision');
require('dotenv').config();

// Utiliser CORS pour autoriser toutes les origines
app.use(cors());

// Utiliser JSON pour le parsing des requêtes HTTP
app.use(express.json());

// Routes pour les révisions
app.use('/api/revision', revisionRoutes);

// Définir le port d'écoute
const PORT = process.env.PORT || 5000; // Utilisez  ou un autre port disponible

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
