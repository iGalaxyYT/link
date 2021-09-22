import { supabase } from '../lib/initSupabase';

import { Auth } from '@supabase/ui';
import { useRouter } from 'next/router';

import styles from '../styles/Home.module.scss';

export default function Home() {
  const router = useRouter();
  const { user } = Auth.useUser();

  if (user) {
    return (
      <div className={styles.PageContainer}>
        <p>Hello, {user.email}</p>
        <br />
        <button onClick={() => {
          supabase.auth.signOut();
        }}>Sign Out</button>
      </div>
    )
  } else {
    return (
      <div className={styles.PageContainer}>
        <div className={styles.AuthContainer}>
          <h1>s.igalaxy.dev</h1>
          {
            router.query.error ?
            <h4>Access Denied</h4>
            : <h4>Private URL shortener</h4>
          }
          <Auth
            supabaseClient={supabase}
            providers={['discord']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
            socialColors={true}
            onlyThirdPartyProviders={true}
            style={{border: '1px solid black', padding: '20px', borderRadius: '5px'}}
          />
        </div>
      </div>
    )
  }
}