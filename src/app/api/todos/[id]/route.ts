import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request, path: any) {
  const { id } = path.params;
  const todo = await prisma.todo.findFirst({ where: { id: id } });
  if (!todo)
    return NextResponse.json(
      {
        err: "No existe",
      },
      { status: 404 }
    );

  return NextResponse.json({
    todo,
  });
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});
export async function PUT(request: Request, path: any) {
  try {
    const { id } = path.params;
    const {description,complete} = await putSchema.validate(await request.json());
    const todo = await prisma.todo.update({
      data: {description,complete},
      where: { id },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ err: error }, { status: 400 });
  }
}
