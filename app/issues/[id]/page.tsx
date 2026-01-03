import { prisma } from "@/app/api/issues/prisma";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}
const IssuesDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  if (!issue) notFound();

  return (
    <div className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex gap="2" align="center" mt="2">
        <IssueStatusBadge status={issue.status} />
        <Text>Created At: {issue.createdAt.toDateString()} </Text>
      </Flex>
      <Card className="mt-5 p-5 prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssuesDetailPage;
