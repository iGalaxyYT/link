import { supabase } from '../lib/initSupabase';
import { getCode } from '../lib/getCode';

import { Auth, Input, Button } from '@supabase/ui';

import { UserData } from '../types/UserData';
import { RouteData } from '../types/RouteData';

import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import RouteCard from '../components/RouteCard';

import styles from '../styles/Home.module.scss';

export default function Home() {
  const router = useRouter();
  const { user } = Auth.useUser();
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>(undefined);

  const fetcher = (url: string) => fetch(url, {
    headers: {
      'Authentication': (supabase.auth.session()?.access_token as string)
    }
  }).then((res) => res.json());

  const { data: userData, error: userDataError } = useSWR<UserData>(`/api/getUser`, fetcher);

  if (user) {
    return (
      <div className={styles.PageContainer}>
        <div className={styles.ContentContainer}>
          <p>Hello, {user.email}</p>
          <br />
          <button onClick={() => {
            supabase.auth.signOut();
          }}>Sign Out</button>
          <br />
          <div style={{border: '1px solid black', padding: '20px', borderRadius: '5px', margin: '20px'}}>
            <p>Add New Route</p>
            <Input id="sourceInput" label="Source" placeholder="hello-world" descriptionText="Leave blank for a random URL" />
            <Input id="destinationInput" label="Destination" placeholder="https://example.com" />
            <br />
            <p>{errorMessage}</p>
            <Button onClick={async () => {
              const source = (document.getElementById('sourceInput') as any)?.value;
              const destination = (document.getElementById('destinationInput') as any)?.value;

              const { data, error } = await supabase
                .from<RouteData>('routes')
                .select('*')
                .match({ source: source });

              if (data && data[0]) return setErrorMessage('Route already exists');

              await supabase
                .from<RouteData>('routes')
                .insert([
                  {owner: user.id, source: (source === '' ? getCode(6) : source), destination: destination}
                ]);

              setErrorMessage(undefined);
              
              (document.getElementById('sourceInput') as any).value = "";
              (document.getElementById('destinationInput') as any).value = "";
            }}>Create</Button>
          </div>
          {userData?.routes.map(x => <RouteCard key={x.id} data={x} />)}
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.PageContainer}>
        <div className={styles.AuthContainer}>
          <h1>link.igalaxy.dev</h1>
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
