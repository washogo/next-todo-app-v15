import { notFound } from "next/navigation";
// import { createClient } from "../../../utils/supabase-server";
import TodoDetail from "../../components/pages/TodoDetailPage";
import type { TodoListType } from "../../../utils/todo.types";

type PageProps = {
  params: Promise<{ todoId: string }>
};

// Todo詳細
const TodoDetailPage = async ({ params }: PageProps) => {
  const response = await fetch(`/api/todo/${(await params).todoId}`, { method: "GET" });

  if (!response.ok) {
    const errorData = await response.json();
    alert(errorData.error || "取得に失敗しました。");
    return;
  }
  const todoData = await response.json();
  // const supabase = createClient();

  // // Todo詳細取得
  // const { data: todoData } = await supabase
  //   .from("todos")
  //   .select("*")
  //   .eq("id", params.todoId)
  //   .single();

  // Todoが存在しない場合
  if (!todoData) return notFound();

  // 表示Todo詳細作成
  const todo: TodoListType = {
    id: todoData.id,
    created_at: todoData.created_at,
    title: todoData.title,
    content: todoData.content,
    user_id: todoData.user_id,
    status: todoData.status,
    comment: todoData.comment,
  };

  return <TodoDetail todo={todo} />;
};

export default TodoDetailPage;
