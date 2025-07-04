const { createClient } = require("@supabase/supabase-js");

async function createAnnonce({
  titre,
  description,
  prix,
  localité,
  category_id,
  user_id,
  token,
}) {
  console.log("Data envoyée à Supabase :", {
    titre,
    description,
    prix,
    localité,
    category_id,
    user_id,
  });

  // Création d’un client Supabase avec le token
  const supabaseUserClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data, error } = await supabaseUserClient
    .from("annonces")
    .insert([{ titre, description, prix, localité, category_id, user_id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

module.exports = { createAnnonce };