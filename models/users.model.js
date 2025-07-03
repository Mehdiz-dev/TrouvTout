const supabase = require('../services/supabaseClient');

exports.signupUser = async (email, password, pseudo) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Erreur signup Supabase auth:', error);
    throw error;
  }

  const userId = data?.user?.id;
  if (!userId) throw new Error("ID utilisateur non récupéré");

  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{ id: userId, pseudo }]);

  if (profileError) {
    console.error('Erreur insertion profil :', profileError);// erreur détaillée pour débug supabase
    throw profileError;
  }

  return { id: userId, email, pseudo };
};


exports.getProfileById = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};
