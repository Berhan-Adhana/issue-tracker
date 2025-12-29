import { Box, Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl flex flex-col gap-4 mx-auto mt-10">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Box as="div" className="flex justify-end">
        <Button>Submit New Issue</Button>
      </Box>
    </div>
  );
};

export default NewIssuePage;
