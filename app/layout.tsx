import 'server-only';

import SupabaseListener from './components/supabase-listener';
import SupabaseProvider from './components/supabase-provider';
import '../styles/globals.css';
import Navigation from './components/navigation';
import { createClient } from '../utils/supabase-server';
import Head from './head';
import HeadItem from 'next/head';

// キャッシュをしない
export const revalidate = 0;

// レイアウト
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // TODO: cookieの取得で警告が発生する
  const supabase = createClient();

  // セッション情報取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html>
      <body>
        <HeadItem>
          <Head />
          <link rel="icon" href="/favicon.ico" />
        </HeadItem>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />

          <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-1 container max-w-screen-xl mx-auto px-5 py-10">{children}</main>

            <footer className="py-5 border-t">
              <div className="text-center text-sm text-gray-500">Copyright © All rights reserved</div>
            </footer>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
