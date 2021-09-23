import { supabase } from "../lib/initSupabase";
import { Button } from '@supabase/ui';

export default function RouteCard({ data, updateUserData }: any) {
    return (
        <>
            <div style={{border: '1px solid black', padding: '20px', borderRadius: '5px', margin: '20px'}}>
                Source: {data.source}
                <br />
                Destination: {data.destination}
                <br />
                <br />
                <Button onClick={ async () => {
                    await supabase
                        .from('routes')
                        .delete()
                        .eq('id', data.id);

                    updateUserData();
                }} danger={true}>Delete</Button>
            </div>
        </>
    )
}