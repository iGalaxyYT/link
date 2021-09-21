import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  )
}
export default MyApp;
