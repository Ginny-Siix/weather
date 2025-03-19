// 📌 INSCRIPTION (SIGNUP)
document.querySelector("#signup").addEventListener("click", function () {
  const user = {
    name: document.querySelector("#registerName").value,
    email: document.querySelector("#registerEmail").value,
    password: document.querySelector("#registerPassword").value,
  };

  console.log("Données envoyées :", user); // Vérifie que les données sont envoyées

  // Vérification simple des champs
  if (!user.name || !user.email || !user.password) {
    showMessage("❌ Veuillez remplir tous les champs.", false);
    return;
  }

  fetch("https://weather-eight-rho-40.vercel.app/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse du serveur:", data);
      if (data.result) {
        showMessage("✅ Inscription réussie !", true);
        window.location.assign("index.html"); // Redirection vers la page principale après inscription
      } else {
        showMessage("❌ Erreur lors de l'inscription.", false);
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      showMessage("❌ Erreur serveur, veuillez réessayer.", false);
    });
});

// 📌 CONNEXION (SIGNIN)
document.querySelector("#signin").addEventListener("click", function () {
  const user = {
    email: document.querySelector("#connectionEmail").value,
    password: document.querySelector("#connectionPassword").value,
  };

  console.log("Données envoyées :", user); // Vérifie les données envoyées

  // Vérification simple des champs
  if (!user.email || !user.password) {
    showMessage("❌ Veuillez remplir tous les champs.", false);
    return;
  }

  fetch("https://weather-eight-rho-40.vercel.app/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse du serveur:", data); // Vérifie la réponse du serveur
      if (data.result) {
        showMessage("✅ Connexion réussie !", true);
        window.location.assign("index.html"); // Redirection vers la page principale après connexion
      } else {
        showMessage("❌ Email ou mot de passe incorrect.", false);
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      showMessage("❌ Erreur serveur, veuillez réessayer.", false);
    });
});

// Fonction pour afficher un message à l'utilisateur
function showMessage(message, isSuccess) {
  const messageBox = document.querySelector("#messageBox");
  if (!messageBox) {
    console.error("❌ Erreur : #messageBox n'existe pas dans le DOM !");
    return;
  }

  if (typeof message === 'undefined' || message === null || message === '') {
    console.error("❌ Erreur : message indéfini ou vide !");
    message = "❌ Erreur inconnue.";
  }

  messageBox.innerText = message;
  messageBox.style.color = isSuccess ? "green" : "red";
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}
