import { Suspense } from 'react';
import Loading from '../loading';
import TodoListPage from '../components/pages/TodoListPage';
import { createClient } from '@/utils/supabase-server';
import { getBaseUrl } from '@/utils/getBaseUrl';

export const dynamic = 'force-dynamic';

// メインページ
const TodoPage = async () => {
  // セッション情報の取得
  const { data, error } = await createClient().auth.getSession();
  if (error) {
    console.error(error.message);
    return null;
  }
  const { session } = data;

  // TODO一覧取得
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/todo?userId=${session?.user.id}`);

  if (!response.ok) {
    throw new Error('取得に失敗しました。');
  }

  if (response.status === 404) {
    const res = await response.json();
    console.error(res.error);
    return null;
  }

  const todos = await response.json();

  return (
    <div className="h-full">
      <Suspense fallback={<Loading />}>
        <TodoListPage todos={todos} />
      </Suspense>
    </div>
  );
};

export default TodoPage;
