import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" align="center" mt="2">
        <IssueStatusBadge status={issue.status} />
        <Text>Created At: {issue.createdAt.toDateString()} </Text>
      </Flex>
      <Card className="mt-5 p-5 prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
