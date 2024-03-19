export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSession } from "@/auth/actions/auth.actions";
import prisma from "@/lib/prisma";
import { NewTodo } from "@/todos/components/NewTodo";
import { TodosGrid } from "@/todos/components/TodosGrid";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado Todos",
  description: "Listado Todos",
};

export default async function RestTodoPage() {
  const user = await getUserSession();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: "asc" },
  });

  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
