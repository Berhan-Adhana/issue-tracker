import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";
import { IssueSchema } from "@/app/validationSchema";
import { z } from "zod";

interface Props {
  params: Promise<{ id: string }>;
}
export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: z.treeifyError(validation.error) },
      { status: 400 }
    );
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return NextResponse.json(
      { error: `Issue with id ${id} not found` },
      { status: 404 }
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title || "Updated Title",
      description: body.description || "Updated Description",
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}
