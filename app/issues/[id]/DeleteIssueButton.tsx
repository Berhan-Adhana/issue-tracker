"use client";
import { useRouter } from "next/navigation";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import axios from "axios";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <TrashIcon />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={(e) => {
                axios
                  .delete("/api/issues/" + issueId)
                  .then(() => {
                    router.push("/issues");
                    router.refresh();
                  })
                  .catch((error) => {
                    console.error("Failed to delete the issue:", error.message);
                  });
              }}
            >
              Confirm Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
