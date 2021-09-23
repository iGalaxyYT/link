import { supabase } from "../lib/initSupabase";
import { RouteData } from "../types/RouteData"

export default function RouteCard({ data, updateUserData }: any) {
    return (
        <>
            <div style={{border: '1px solid black', padding: '20px', borderRadius: '5px', margin: '20px'}}>
                Source: {data.source}
                <br />
                Destination: {data.destination}
                <br />
                <button onClick={ async () => {
                    await supabase
                        .from('routes')
                        .delete()
                        .eq('id', data.id);

                    updateUserData();
                }}>Delete</button>
            </div>
        </>
    )
}