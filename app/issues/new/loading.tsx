import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton count={5} />
      <Skeleton width={100} />
    </Box>
  );
};

export default LoadingNewIssuePage;
