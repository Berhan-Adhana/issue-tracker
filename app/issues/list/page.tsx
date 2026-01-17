import { prisma } from "@/prisma/prisma";
import { Table, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import IssueActions from "./IssueActions";
import { Status } from "@/app/generated/prisma/enums";
import { Issue } from "@/app/generated/prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams?: { status?: string; orderBy?: keyof Issue };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statusParam = await searchParams;

  const status = Object.values(Status).includes(statusParam?.status as Status)
    ? (statusParam?.status as Status)
    : undefined;

  console.log("The status is: ", status);

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Create", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const data: Issue[] = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div className="">
      <IssueActions />
      <Table.Root className="mt-5" layout={"auto"} variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.label} className={col.className}>
                <NextLink
                  href={`/issues/list?status=${status ?? ""}&orderBy=${
                    col.value
                  }`}
                >
                  {col.label}
                </NextLink>
                {col.value === statusParam?.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.length === 0 && <Text className="p-3">No issues found.</Text>}
          {data.length > 0 &&
            data.map((issue) => (
              <Table.Row key={issue.id.toFixed()}>
                <Table.Cell>
                  <NextLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </NextLink>
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
