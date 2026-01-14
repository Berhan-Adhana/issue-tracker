import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root defaultValue="Select Assignee">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="Select Assignee"> Select Assignee</Select.Item>
          <Select.Item value="berhan"> Berhan</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
