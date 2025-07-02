const supabase = require('../services/supabaseClient');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert({ ...userData, password: hashedPassword })
    .select();
  if (error) throw error;
  return data[0];
};

exports.getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};
