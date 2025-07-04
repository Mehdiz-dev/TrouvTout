const token = localStorage.getItem("access_token");
const annoncesContainer = document.getElementById("annoncesContainer");
const result = document.getElementById("resultat");

async function fetchAnnonces() {
  try {
    const res = await fetch("http://localhost:3000/api/annonces");
    const annonces = await res.json();

    annoncesContainer.innerHTML = "";

    annonces.forEach((annonce) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${annonce.titre}</strong> — ${annonce.prix}€ (${annonce.localité})</p>
        <button data-id="${annonce.id}" class="ajouter">Ajouter en favori</button>
        <button data-id="${annonce.id}" class="retirer">Supprimer</button>
        <hr>
      `;
      annoncesContainer.appendChild(div);
    });

    document.querySelectorAll(".ajouter").forEach((btn) =>
      btn.addEventListener("click", () => addFavori(btn.dataset.id))
    );

    document.querySelectorAll(".retirer").forEach((btn) =>
      btn.addEventListener("click", () => removeFavori(btn.dataset.id))
    );
  } catch (err) {
    result.innerText = "Erreur chargement annonces";
  }
}

async function addFavori(annonce_id) {
  const res = await fetch("http://localhost:3000/api/favoris", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ annonce_id })
  });

  const data = await res.json();
  result.innerText = data.message || "Erreur.";
}

async function removeFavori(annonce_id) {
  const res = await fetch(`http://localhost:3000/api/favoris/${annonce_id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();
  result.innerText = data.message || "Erreur.";
}

fetchAnnonces();
