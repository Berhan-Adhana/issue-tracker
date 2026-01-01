import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/app/api/issues/prisma";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { Status } from "../generated/prisma/enums";

const IssuesPage = async () => {
  const data: Array<{
    id: number;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }> = await prisma.issue.findMany();
  return (
    <div className="">
      <div className="mb-5">
        <Button className="justify-self-star">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <Table.Root className="mt-5" layout={"auto"} variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length === 0 && <p>No issues found.</p>}
          {data.length > 0 &&
            data.map((issue) => (
              <Table.Row key={issue.id.toFixed()}>
                <Table.Cell>{issue.title}</Table.Cell>
                <Table.Cell>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
