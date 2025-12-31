"use client";
import { Box, Button, Callout, TextArea } from "@radix-ui/themes";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { set, z } from "zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React from "react";

interface NewIssueForm {
  title: string;
  description: string;
}

const newIssueSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
});

const NewIssuePage = () => {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<NewIssueForm>();

  const onSubmit: SubmitHandler<NewIssueForm> = (data) => {
    const validation = newIssueSchema.safeParse(data);
    if (!validation.success) {
      setError("Validation failed. Please check your input.");
      return;
    }
    axios
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

  return (
    <div className="max-w-xl flex flex-col gap-4 mx-auto ">
      {error && (
        <Callout.Root>
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <TextArea placeholder="Title" {...register("title")} />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              className="min-h-[300px]"
              placeholder="Description"
              {...field}
            />
          )}
        ></Controller>
        <Box as="div" className="flex justify-end">
          <Button type="submit">Submit New Issue</Button>
        </Box>
      </form>
    </div>
  );
};

export default NewIssuePage;
