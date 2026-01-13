"use client";

import { Spinner } from "@/app/components";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = () => {
    setIsDeleting(true);
    axios
      .delete("/api/issues/" + issueId)
      .then(() => {
        router.push("/issues");
        router.refresh();
      })
      .catch((error) => {
        setIsDeleting(false);
        setError(true);
        console.error("Failed to delete the issue:", error.message);
      });
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            {isDeleting ? (
              <Spinner />
            ) : (
              <>
                <TrashIcon /> Delete Issue
              </>
            )}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue?
          </AlertDialog.Description>

          <Flex gap={"2"} mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Confirm Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error </AlertDialog.Title>
          <AlertDialog.Description size="2">
            This issue cannot be deleted.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                OK
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
