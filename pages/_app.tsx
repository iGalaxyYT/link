import { supabase } from '../lib/initSupabase';

import { Auth } from '@supabase/ui';
import type { AppProps } from 'next/app';

import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  )
}