document.addEventListener("DOMContentLoaded", () => {
  console.log("Script JavaScript chargé");
  chargerDonneesMeteo();
});

function chargerDonneesMeteo() {
  fetch("https://weather-eight-rho-40.vercel.app/weather")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Données reçues :", data);
      const cityList = document.querySelector("#cityList");
      if (!cityList) {
        console.error("❌ Erreur : #cityList n'existe pas dans le DOM !");
        return;
      }
      cityList.innerHTML = "";
      if (data.weather) {
        data.weather.forEach((city) => {
          console.log("Ajout de la ville :", city.cityName);
          cityList.innerHTML += `
            <div class="cityContainer">
              <p class="name">${city.cityName}</p>
              <p class="description">${city.description}</p>
              <img class="weatherIcon" src="images/${city.main}.png"/>
              <div class="temperature">
                <p class="tempMin">${city.tempMin}°C</p>
                <span>-</span>
                <p class="tempMax">${city.tempMax}°C</p>
              </div>
              <button class="deleteCity" id="${city.cityName}">Delete</button>
            </div>`;
        });
        updateDeleteCityEventListener();
      }
    })
    .catch(error => console.error("❌ Erreur lors du chargement des données météo :", error.message));
}

function updateDeleteCityEventListener() {
  const deleteButtons = document.querySelectorAll(".deleteCity");
  if (deleteButtons.length === 0) return;

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Suppression de :", this.id);
      fetch(`https://weather-eight-rho-40.vercel.app/weather/${this.id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erreur serveur : ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Réponse de suppression :", data);
          if (data.result) {
            this.closest(".cityContainer").remove();
          } else {
            showMessage("❌ Erreur lors de la suppression", false);
          }
        })
        .catch(error => console.error("❌ Erreur lors de la suppression :", error.message));
    });
  });
}

document.querySelector("#addCity").addEventListener("click", function (event) {
  event.preventDefault();
  const cityName = document.querySelector("#cityNameInput").value.trim();
  if (!cityName) {
    showMessage("❌ Veuillez entrer un nom de ville.", false);
    return;
  }

  fetch("https://weather-eight-rho-40.vercel.app/weather", {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Réponse après ajout :", data);
      if (data.result && Array.isArray(data.weather) && data.weather.length > 0) { 
        const city = data.weather[0];
        document.querySelector("#cityList").innerHTML += `
          <div class="cityContainer">
            <p class="name">${city.cityName}</p>
            <p class="description">${city.description}</p>
            <img class="weatherIcon" src="images/${city.main}.png"/>
            <div class="temperature">
              <p class="tempMin">${city.tempMin}°C</p>
              <span>-</span>
              <p class="tempMax">${city.tempMax}°C</p>
            </div>
            <button class="deleteCity" id="${city.cityName}">Delete</button>
          </div>`;
        updateDeleteCityEventListener();
        document.querySelector("#cityNameInput").value = "";
        showMessage("✅ Ville ajoutée avec succès !", true);
      } else {
        showMessage("❌ Erreur : " + data.error, false);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l’ajout de la ville:", error);
      showMessage("❌ Erreur serveur", false);
    });
});

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
  }, 3000);
}
