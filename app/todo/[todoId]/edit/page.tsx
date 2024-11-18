import { notFound } from 'next/navigation';
// import { createClient } from "../../../../utils/supabase-server";

import TodoEdit from '../../../components/pages/TodoEditPage';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { TodoApiErrorResponse, TodoApiSuccessResponse } from '@/utils/response.types';

type PageProps = {
  params: Promise<{ todoId: string }>;
};

// TODO編集ページ
const TodoEditPage = async ({ params }: PageProps) => {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/todo/${(await params).todoId}`, { method: 'GET' });

  if (!response.ok) {
    throw new Error('取得に失敗しました。');
  }

  // TODOが存在しない場合
  if (response.status === 404) {
    const res: TodoApiErrorResponse = await response.json();
    console.error(res.error);
    return notFound();
  }

  const res: TodoApiSuccessResponse = await response.json();
  return <TodoEdit todo={res} />;
};

export default TodoEditPage;
