"use client";

import { ErrorMessage } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { IssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import z from "zod";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isLoading, isValid, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
    // If issue is provided (edit mode), set default values
    defaultValues: issue
      ? {
          title: issue.title,
          description: issue.description,
        }
      : {
          title: "",
          description: "",
        },
  });

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      setError(null);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data, {
          headers: {
            "Content-type": "application/json",
          },
        });
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root>
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="mt-10 flex flex-col gap-4  "
        onSubmit={handleSubmit(onSubmit, (formErrors) => {
          console.log("Form validation failed", formErrors);
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Box as="div" className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || isLoading || !isValid}
          >
            {isSubmitting ? (
              <Spinner />
            ) : issue ? (
              "Update Issue"
            ) : (
              "Submit New Issue"
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default IssueForm;
