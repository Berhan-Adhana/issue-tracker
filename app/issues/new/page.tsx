import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NewIssueClient from "./NewIssueClient";

const NewIssuePage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  return <NewIssueClient />;
};

export default NewIssuePage;
