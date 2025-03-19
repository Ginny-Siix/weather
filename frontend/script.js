
console.log("Script JavaScript chargé");

// 📌 CHARGER LES DONNÉES MÉTÉO
fetch("weather-evt5tsu20-ginny-siixs-projects.vercel.app/weather")
  .then((response) => response.json())
  .then((data) => {
    if (data.weather) {
      data.weather.forEach((city) => {
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
      });
      updateDeleteCityEventListener();
    }
  });

// 📌 SUPPRIMER UNE VILLE
function updateDeleteCityEventListener() {
  document.querySelectorAll(".deleteCity").forEach((button) => {
    button.addEventListener("click", function () {
      fetch(`weather-evt5tsu20-ginny-siixs-projects.vercel.app/weather/${this.id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            this.parentNode.remove();
          } else {
            showMessage("❌ Erreur lors de la suppression", false);
          }
        });
    });
  });
}

// 📌 AJOUTER UNE VILLE
document.querySelector("#addCity").addEventListener("click", function (event) {
  event.preventDefault();
  const cityName = document.querySelector("#cityNameInput").value.trim();
  if (!cityName) {
    showMessage("❌ Veuillez entrer un nom de ville.", false);
    return;
  }

  
  fetch("weather-evt5tsu20-ginny-siixs-projects.vercel.app/weather", {  
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        document.querySelector("#cityList").innerHTML += `
			<div class="cityContainer">
				<p class="name">${data.weather.cityName}</p>
				<p class="description">${data.weather.description}</p>
				<img class="weatherIcon" src="images/${data.weather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
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

// 📌 AFFICHER UN MESSAGE
function showMessage(message, isSuccess) {
  const messageBox = document.querySelector("#messageBox");
  messageBox.innerText = message;
  messageBox.style.color = isSuccess ? "green" : "red";
  messageBox.style.display = "block";

  // Cacher le message après 3 secondes
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}

