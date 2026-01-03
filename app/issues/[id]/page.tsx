import { prisma } from "@/app/api/issues/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}
const IssuesDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  if (!issue) notFound();

  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.description}</p>
      <p>Status: {issue.status}</p>
      <p>Created At: {issue.createdAt.toDateString()} </p>
    </div>
  );
};

export default IssuesDetailPage;
