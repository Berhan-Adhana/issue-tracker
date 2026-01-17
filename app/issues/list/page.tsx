import { prisma } from "@/prisma/prisma";
import { Link, Table, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import IssueActions from "./IssueActions";
import { Status } from "@/app/generated/prisma/enums";
import { Issue } from "@/app/generated/prisma/client";

interface Props {
  searchParams?: { status?: string };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statusParam = await searchParams;

  const status = Object.values(Status).includes(statusParam?.status as Status)
    ? (statusParam?.status as Status)
    : undefined;

  console.log("Search params:", status);
  const data: Issue[] = await prisma.issue.findMany({
    where: { status },
  });

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
          {data.length === 0 && <Text className="p-3">No issues found.</Text>}
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
