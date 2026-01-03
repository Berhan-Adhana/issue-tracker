import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { IssueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.message },
      { status: 400 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });

  // such as saving it to a database. For demonstration purposes,
  // we'll just return the received data.
}
