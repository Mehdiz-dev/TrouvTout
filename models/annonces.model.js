const supabase = require("../services/supabaseClient");

async function createAnnonce({ titre, description, prix, localité, category_id, user_id }) {
  const { data, error } = await supabase
    .from("annonces")
    .insert([{ titre, description, prix, localité, category_id, user_id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

module.exports = { createAnnonce };
