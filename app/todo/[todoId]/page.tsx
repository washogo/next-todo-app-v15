import { notFound } from 'next/navigation';
import TodoDetail from '../../components/pages/TodoDetailPage';
import type { TodoListType } from '../../../utils/todo.types';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { TodoApiErrorResponse } from '@/utils/response.types';

type PageProps = {
  params: Promise<{ todoId: string }>;
};

// Todo詳細
const TodoDetailPage = async ({ params }: PageProps) => {
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

  const res = await response.json();

  // 表示Todo詳細作成
  const todo: TodoListType = {
    id: res.id,
    created_at: res.created_at,
    title: res.title,
    content: res.content,
    user_id: res.user_id,
    status: res.status,
    comment: res.comment,
  };

  return <TodoDetail todo={todo} />;
};

export default TodoDetailPage;
