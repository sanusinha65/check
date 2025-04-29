import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a simple in-memory storage for SSR
const createServerStorage = () => {
  let storage = {};
  return {
    getItem: (key) => storage[key] || null,
    setItem: (key, value) => { storage[key] = value },
    removeItem: (key) => { delete storage[key] },
    clear: () => { storage = {} }
  };
};

// Determine if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Create the appropriate storage based on environment
const storage = isBrowser ? window.localStorage : createServerStorage();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'x-client-info': 'outx-web'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})