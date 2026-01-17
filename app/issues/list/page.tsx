import { Issue } from "@/app/generated/prisma/client";
import { Status } from "@/app/generated/prisma/enums";
import { prisma } from "@/prisma/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const searchParameters = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParameters.status)
    ? searchParameters.status
    : undefined;
  const where = { status };

  const orderBy = columnNames.includes(searchParameters.orderBy)
    ? { [searchParameters?.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
  });

  return (
    <div className="">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParameters} />
    </div>
  );
};

export default IssuesPage;

export const dynamic = "force-dynamic";

export const tableColumns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Create", value: "createdAt", className: "hidden md:table-cell" },
];
