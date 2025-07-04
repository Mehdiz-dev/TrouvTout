const form = document.getElementById("annonceForm");
const categorySelect = document.getElementById("categorySelect");

async function fetchCategories() {
  try {
    const res = await fetch("http://localhost:3000/api/categories");
    const categories = await res.json();

    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.nom;
      categorySelect.appendChild(option);
    });
  } catch (err) {
    console.error("Erreur chargement des catégories :", err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const annonce = Object.fromEntries(formData.entries());

  annonce.prix = parseFloat(annonce.prix);
  annonce.category_id = parseInt(annonce.category_id);

  console.log("Annonce à envoyer :", annonce);

  const token = localStorage.getItem("access_token");
  if (!token) {
    return alert("Utilisateur non connecté.");
  }

  try {
    const res = await fetch("http://localhost:3000/api/annonces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(annonce),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Annonce créée avec succès !");
      console.log(result);
    } else {
      alert("Erreur : " + result.message);
    }
  } catch (err) {
    alert("Erreur serveur");
    console.error(err);
  }
});

fetchCategories();
