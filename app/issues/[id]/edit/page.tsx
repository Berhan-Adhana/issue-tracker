import { prisma } from "@/prisma/prisma";
import IssueForm from "../../_components/IssueForm";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }
  const id = (await params).id;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
