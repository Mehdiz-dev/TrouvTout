document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const pseudo = document.getElementById('pseudo').value;

  const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

  if (signUpError) {
    document.getElementById('response').innerText = signUpError.message;
    return;
  }

  const user_id = data.user.id;

  const { error: insertError } = await supabase
    .from('users')
    .insert({ id: user_id, pseudo });

  if (insertError) {
    document.getElementById('response').innerText = insertError.message;
  } else {
    document.getElementById('response').innerText = "Inscription réussie !";
  }
});
