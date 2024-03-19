"use server";

import { getUserSession } from "@/auth/actions/auth.actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(2);
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw `Todo con id ${id} not found`;

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updateTodo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  const user = await getUserSession();
  const newTodo = await prisma.todo.create({
    data: { description, userId: user?.id },
  });
  revalidatePath("/dashboard/server-todos");
  return newTodo;
};

export const deleteCompleted = async () => {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath("/dashboard/server-todos");
};
