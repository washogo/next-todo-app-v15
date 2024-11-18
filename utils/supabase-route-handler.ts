import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
};
