document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const pseudo = document.getElementById('pseudo').value;

  try {
    const res = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, pseudo })
    });

    const data = await res.json();
    document.getElementById('response').innerText = data.message;
  } catch (err) {
    document.getElementById('response').innerText = 'Erreur côté client.';
  }
});
