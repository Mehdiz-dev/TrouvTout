document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    document.getElementById('response').innerText = error.message;
  } else {
    document.getElementById('response').innerText = "Connecté !";
    const access_token = data.session.access_token;
    const user_id = data.user.id;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user_id", user_id);

    const profileRes = await fetch(`http://localhost:3000/api/users/${user_id}`, {
      headers: {
        Authorization: "Bearer " + access_token
      }
    });
    const profile = await profileRes.json();

    localStorage.setItem("user_pseudo", profile.pseudo || "Inconnu");
    localStorage.setItem("user_localité", profile.localité || "");

    console.log("Connecté :", profile.pseudo);
  }

});
