"use client";

import { Issue, User } from "@/app/generated/prisma/client";

import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components/";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUser();
  if (isLoading) return <Skeleton />;

  if (error) return null;

  const onAssigneeChange = async (value: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: value || null,
      });
    } catch (error) {
      toast.error("Changes could not saved.");
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={onAssigneeChange}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=" ">UnAssign</Select.Item>
            {users!.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
            {/* <Select.Item value="berhan"> Berhan</Select.Item> */}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
