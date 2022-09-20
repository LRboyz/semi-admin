import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ucraobyasxwobmuvmdcy.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcmFvYnlhc3h3b2JtdXZtZGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEzMDE1NTMsImV4cCI6MTk3Njg3NzU1M30.7zaADhGycdjFnxfDeXZN-6f_vUr3bGEPlzgGZCzNse0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
