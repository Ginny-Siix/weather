// Insert your code here

// 📌 INSCRIPTION (SIGNUP)
document.querySelector("#signup").addEventListener("click", function () {


  // Assure-toi de définir user dans la fonction avant de l'utiliser
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
        window.location.assign("index.html");
      }
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
        window.location.assign("index.html");
      }
    });
});
