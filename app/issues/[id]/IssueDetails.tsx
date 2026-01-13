
import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import MarkdownPreviewClient from "./MarkdownPreviewClient";


const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" align="center" mt="2">
        <IssueStatusBadge status={issue.status} />
        <Text>Created At: {issue.createdAt.toDateString()} </Text>
      </Flex>
      <Card className="mt-5 p-5 prose max-w-full">
        <MarkdownPreviewClient source={issue.description} />
      </Card>
    </>
  );
};

export default IssueDetails;
