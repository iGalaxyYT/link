import { supabase } from '../../lib/initSupabase';

import { NextApiRequest, NextApiResponse } from 'next';

import { UserData } from '../../types/UserData';
import { RouteData } from '../../types/RouteData';

export default async function getUser(req: NextApiRequest, res: NextApiResponse<UserData | any>) {
  console.log(req.headers);
  console.log(req.headers.authentication);

  const userId = (await supabase.auth.api.getUser(req.headers.authentication as string)).user?.id;

  const { data, error } = await supabase
    .from<RouteData>('routes')
    .select('*')
    .match({ owner: userId });

  if (data && data[0]) return res.status(200).json({id: userId, routes: data});

  return res.status(404).json({error: 'User not found'});
}