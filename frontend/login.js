// 📌 INSCRIPTION (SIGNUP)
document.querySelector("#signup").addEventListener("click", function () {
  const user = {
    name: document.querySelector("#registerName").value,
    email: document.querySelector("#registerEmail").value,
    password: document.querySelector("#registerPassword").value,
  };

  console.log("Données envoyées :", user); // Vérifie que les données sont envoyées

  fetch("https://weather-eight-rho-40.vercel.app/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse du serveur:", data);
      if (data.result) {
        showMessage("✅ Inscription réussie ! Vous pouvez maintenant vous connecter.", true);
      } else {
        showMessage("❌ Erreur lors de l'inscription. Veuillez vérifier vos informations.", false);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'inscription:", error);
      showMessage("❌ Erreur serveur", false);
    });
});

// 📌 CONNEXION (SIGNIN)
document.querySelector("#signin").addEventListener("click", function () {
  const user = {
    email: document.querySelector("#connectionEmail").value,
    password: document.querySelector("#connectionPassword").value,
  };

  console.log("Données envoyées :", user); // Vérifie les données envoyées

  fetch("https://weather-eight-rho-40.vercel.app/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse du serveur:", data); // Vérifie la réponse du serveur
      if (data.result) {
        // Afficher le message de succès
        showMessage("✅ Vous êtes connecté !", true);
      } else {
        // Afficher un message d'erreur
        showMessage("❌ Erreur de connexion. Veuillez vérifier vos informations.", false);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion:", error);
      showMessage("❌ Erreur serveur", false);
    });
});

// Fonction pour afficher un message
function showMessage(message, isSuccess) {
  const messageBox = document.querySelector("#messageBox");
  if (!messageBox) {
    console.error("❌ Erreur : #messageBox n'existe pas dans le DOM !");
    return;
  }

  messageBox.innerText = message;
  messageBox.style.color = isSuccess ? "green" : "red";
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000); // Le message disparait après 3 secondes
}
