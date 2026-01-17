"use client";

import { Status } from "@/app/generated/prisma/enums";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
          const params = new URLSearchParams();
          if (status) params.append("status", status);

          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          const query = params.size ? "?" + params.toString() : "";

          router.push(`/issues/list` + query);

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
