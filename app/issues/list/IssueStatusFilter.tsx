"use client";

import { Status } from "@/app/generated/prisma/enums";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const statuses: { label: string; value: Status }[] = [
    // { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];
  return (
    <form method="get" action="/issues/list">
      <Select.Root
        name="status"
        onValueChange={(status) => {
          if (status === "ALL") {
            router.push("/issues/list");
          } else {
            router.push(`/issues/list?status=${status}`);
          }
          // router.push("/issues/list" + query);
        }}
      >
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          <Select.Item value="ALL">All</Select.Item>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || " "}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <button type="submit" hidden />
    </form>
  );
};

export default IssueStatusFilter;
