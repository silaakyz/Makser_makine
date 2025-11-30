import { createClient } from "@supabase/supabase-js";

// Environment variables'dan al
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Hata kontrolü
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Supabase bilgileri bulunamadı!");
  console.log("VITE_SUPABASE_URL:", SUPABASE_URL);
  console.log("VITE_SUPABASE_ANON_KEY:", SUPABASE_ANON_KEY ? "Var" : "Yok");
  throw new Error("Supabase URL veya Anon Key eksik!");
}

console.log("✅ Supabase bağlantısı oluşturuluyor:", SUPABASE_URL);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);