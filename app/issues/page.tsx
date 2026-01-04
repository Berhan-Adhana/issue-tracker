import { prisma } from "@/app/api/issues/prisma";
import { Link, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue } from "../generated/prisma/client";

const IssuesPage = async () => {
  const data: Issue[] = await prisma.issue.findMany();

  return (
    <div className="">
      <IssueActions />
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
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>

                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;

export const dynamic = "force-dynamic";
