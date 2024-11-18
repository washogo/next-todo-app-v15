import { createClient } from '@/utils/supabase-route-handler';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) return NextResponse.json({ error: 'ユーザーIDが必要です' }, { status: 401 });

    const { data: todos, error } = await supabase
      .from('todos')
      .select()
      .eq('user_id', userId!)
      .order('created_at', { ascending: false });

    if (!todos) return NextResponse.json({ error: error.message }, { status: 404 });

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const supabase = createClient();
  try {
    const inserts = await req.json();

    if (!inserts) return NextResponse.json({ error: 'データがありません' }, { status: 400 });
    // TODO: バリデーション処理追加

    const res = await supabase.from('todos').insert(inserts);

    if (res.error) return NextResponse.json({ error: res.error.message }, { status: res.status });

    return NextResponse.json({ message: 'TODOの作成に成功しました' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
