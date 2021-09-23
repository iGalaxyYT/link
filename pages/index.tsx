import { supabase } from '../lib/initSupabase';
import { Auth, Input } from '@supabase/ui';

import { UserData } from '../types/UserData';
import { RouteData } from '../types/RouteData';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import RouteCard from '../components/RouteCard';

import styles from '../styles/Home.module.scss';

export default function Home({ props }: any) {
  const router = useRouter();
  const { user } = Auth.useUser();
  const [ userData, setUserData ] = useState<UserData | undefined>(props);

  useEffect(() => {
    updateUserData();
  }, []);

  async function updateUserData() {
    if (!user) return;

    const { data, error } = await supabase
      .from<RouteData>('routes')
      .select('*')
      .match({ owner: user.id });

    console.log(data);

    if (!data) return;

    return setUserData({ id: user?.id, routes: data });
  }

  if (user) {
    return (
      <div className={styles.PageContainer}>
        <div className={styles.ContentContainer}>
          <p>Hello, {user.email}</p>
          <br />
          <button onClick={() => {
            updateUserData();
          }}>Refresh</button>
          <br />
          <button onClick={() => {
            supabase.auth.signOut();
          }}>Sign Out</button>
          <br />
          <div style={{border: '1px solid black', padding: '20px', borderRadius: '5px', margin: '20px'}}>
            <p>Add New Route</p>
            <Input label="Source" placeholder="hello-world" />
            <Input label="Destination" placeholder="https://example.com" />
          </div>
          {userData?.routes.map(x => <RouteCard key={x.id} data={x} updateUserData={updateUserData} />)}
        </div>
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