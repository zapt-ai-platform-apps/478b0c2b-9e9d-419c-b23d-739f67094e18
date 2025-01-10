import { initializeZapt } from '@zapt/zapt-js';

export const { createEvent, supabase } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);

// Listen for authentication events
supabase.auth.onAuthStateChange((event, session) => {
  console.log(`Auth event: ${event}`);
  // Emit strategic logs
  console.log(`User session: ${session}`);
});

export default supabase;