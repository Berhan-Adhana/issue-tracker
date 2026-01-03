import { prisma } from "@/app/api/issues/prisma";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

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
      <Card variant="surface" className="mt-5 p-5">
        <p>Status: {issue.description}</p>
      </Card>
    </div>
  );
};

export default IssuesDetailPage;
