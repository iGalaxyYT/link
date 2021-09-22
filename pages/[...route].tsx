import { supabase } from '../lib/initSupabase';

import type { RouteData } from '../types/RouteData';

import styles from '../styles/Route.module.scss';

export async function getServerSideProps(context: any) {
    const route = context.params.route;

    const { data, error } = await supabase
        .from<RouteData>('routes')
        .select('*')
        .match({ source: route });

    if (!data) return { notFound: true };

    return {
        redirect: {
            destination: data[0].destination, // destination: string;
            permanent: true,
        }
    }

}

export default function Route({error, message}: any) {
    return (
        <div className={styles.PageContainer}>
            <div className={styles.textContainer}>
                <h4>Redirecting shortly...</h4>
                <h4>{error} {message}</h4>
            </div>
        </div>
    )
}