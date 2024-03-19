import { getUserSession } from "@/auth/actions/auth.actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip") ?? 0);
  const take = Number(searchParams.get("take") ?? 10);
  if (isNaN(skip))
    return NextResponse.json(
      { err: "Skip should be a number" },
      { status: 400 }
    );
  if (isNaN(take))
    return NextResponse.json(
      { err: "take should be a number" },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    skip: skip,
    take: take,
  });

  return NextResponse.json({
    todos,
  });
}

const postSchema = yup.object({
  description: yup.string().required("description is required"),
  complete: yup.boolean().optional().default(false),
});
export async function POST(request: Request) {
  const user = await getUserSession();
  try {
    const { description, complete } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({
      data: {
        description,
        complete,
        userId: user?.id,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ err: error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    const todos = await prisma.todo.findMany();
    return NextResponse.json({ todos });
  } catch (error) {
    return NextResponse.json({ err: error }, { status: 400 });
  }
}
