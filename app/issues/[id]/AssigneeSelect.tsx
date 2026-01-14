import { prisma } from "@/prisma/prisma";
import { Select } from "@radix-ui/themes";

const AssigneeSelect = async () => {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return (
    <Select.Root defaultValue="Select Assignee">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value=" ">UnAssign</Select.Item>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
          {/* <Select.Item value="berhan"> Berhan</Select.Item> */}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
