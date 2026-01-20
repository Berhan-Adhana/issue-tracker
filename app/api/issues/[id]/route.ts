import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { patchIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import { auth } from "@/auth";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  console.log("The id is: ", id);
  const body = await request.json();
  const session = await auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: z.treeifyError(validation.error) },
      { status: 400 },
    );
  }
  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User!" }, { status: 400 });
    }
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return NextResponse.json(
      { error: `Issue with id ${id} not found` },
      { status: 404 },
    );
  }
  const updatedissue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedissue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await auth();

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return NextResponse.json(
      { error: `Issue with id ${id} not found` },
      { status: 404 },
    );
  }

  await prisma.issue.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "Issue deleted successfully" });
}
