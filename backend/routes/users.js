var express = require('express');
var router = express.Router();
const User = require('../models/users');  // Assurez-vous que c'est le bon modèle pour l'utilisateur

// Route pour l'inscription
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si email ou mot de passe sont manquants ou vides
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return res.status(400).json({ result: false, error: 'Missing or empty fields' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ result: false, error: 'User already exists' });
    }
    
    // Créer un nouvel utilisateur (c'est l'étape suivante, je l'ajoute ici pour compléter)
    const newUser = new User({ email, password });
    await newUser.save();

    // Répondre avec un message de succès
    res.status(201).json({ result: true, message: 'User created successfully' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ result: false, error: 'Server error' });
  }
});

// Route pour la connexion (signin)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si email ou mot de passe sont manquants ou vides
  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return res.status(400).json({ result: false, error: 'Missing or empty fields' });
  }

  try {
    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ result: false, error: 'Invalid email or password' });
    }

    // Comparer le mot de passe (tu devrais avoir un hachage du mot de passe ici)
    if (existingUser.password !== password) {
      return res.status(400).json({ result: false, error: 'Invalid email or password' });
    }

    // Répondre avec un message de succès
    res.status(200).json({ result: true, message: 'Signin successful' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ result: false, error: 'Server error' });
  }
});

module.exports = router;
