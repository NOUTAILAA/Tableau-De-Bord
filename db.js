require('dotenv').config(); // Charger les variables d'environnement

const mysql = require('mysql2');

// Créer la connexion à la base de données en utilisant les variables d'environnement
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données avec ID ' + connection.threadId);
});

// Exporter la connexion pour l'utiliser dans d'autres fichiers
module.exports = connection;
