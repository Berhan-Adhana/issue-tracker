import { prisma } from "@/app/api/issues/prisma";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { Pencil2Icon } from "@radix-ui/react-icons";
import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}
const IssuesDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="max-w-xl">
        <Heading>{issue.title}</Heading>
        <Flex gap="2" align="center" mt="2">
          <IssueStatusBadge status={issue.status} />
          <Text>Created At: {issue.createdAt.toDateString()} </Text>
        </Flex>
        <Card className="mt-5 p-5 prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button variant="solid">
          <Pencil2Icon /> Edit Issue
        </Button>
      </Box>
    </Grid>
  );
};

export default IssuesDetailPage;
