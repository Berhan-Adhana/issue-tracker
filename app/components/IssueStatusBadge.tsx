import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma/enums";

const statusMap: Record<
  string,
  { label: string; color: "red" | "green" | "violet" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const statusInfo = statusMap[status];
  return (
    <Badge color={statusInfo.color} variant="solid">
      {statusInfo.label}
    </Badge>
  );
};

export default IssueStatusBadge;
