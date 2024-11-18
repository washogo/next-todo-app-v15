import { TodoApiResponse } from '@/utils/response.types';
import { createClient } from '@/utils/supabase-route-handler';
import { NextResponse } from 'next/server';
// import { createClient } from '@/utils/supabase-server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<TodoApiResponse>> {
  const supabase = createClient();
  const todoId = (await params).id
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', todoId)
      .single();

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
  const updates = await req.json();
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', (await params).id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient();
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', (await params).id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: 'Todo deleted successfully' });
}
