const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Utiliser CORS pour permettre à l'application Vue.js d'accéder à l'API
app.use(cors());

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tcg_marketplace'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Servir les fichiers statiques (images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Endpoint pour récupérer les articles
app.get('/api/articles', (req, res) => {
  const sql = 'SELECT * FROM articles';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`API en cours d'exécution sur http://localhost:${port}`);
});
