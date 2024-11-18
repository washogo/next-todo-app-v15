import { TodoApiResponse } from '@/utils/response.types';
import { createClient } from '@/utils/supabase-route-handler';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<TodoApiResponse>> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from('todos').select('*').eq('id', (await params).id).single();

    if (!data) return NextResponse.json({ error: error.message }, { status: 404 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient();
  try {
    const updates = await req.json();

    if (!updates) return NextResponse.json({ error: 'データがありません' }, { status: 400 });
    // TODO: バリデーション処理追加

    const res = await supabase
      .from('todos')
      .update(updates)
      .eq('id', (await params).id)
      .single();

    if (res.error) return NextResponse.json({ error: res.error.message }, { status: res.status });

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient();
  try {
    // TODO: バリデーション処理追加

    const res = await supabase
      .from('todos')
      .delete()
      .eq('id', (await params).id);

    if (res.error) return NextResponse.json({ error: res.error.message }, { status: res.status });

    return NextResponse.json({ message: 'TODOの削除に成功しました' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
