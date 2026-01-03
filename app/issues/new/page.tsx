"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import delay from "delay";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type NewIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isLoading, isValid, isSubmitting },
  } = useForm<NewIssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<NewIssueForm> = async (data) => {
    await axios
      .post("/api/issues", data)
      .then((response) => {
        console.log("Issue created successfully:", response.data);
        router.push("/issues");
      })
      .catch((error) => {
        // console.error("Error creating issue:", error);
        setError("Failed to create issue. Please try again.");
      });
  };
  delay(5000);
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
            {isSubmitting ? <Spinner /> : "Submit New Issue"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default NewIssuePage;
