document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    document.getElementById('response').innerText = error.message;
  } else {
    document.getElementById('response').innerText = "Connecté !";
    localStorage.setItem('supabase_token', data.session.access_token);
    console.log("Token :", data.session.access_token);
  }
});
