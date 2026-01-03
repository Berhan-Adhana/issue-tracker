import { Box, Flex, Card } from "@radix-ui/themes";

import { Skeleton } from "@/app/components";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="2" align="center" mt="2">
        <Skeleton width={100} />
        <Skeleton width={150} />
      </Flex>
      <Card className="mt-5 p-5 prose">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
