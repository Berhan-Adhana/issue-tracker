"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

const MarkdownPreviewClient = ({ source }: { source: string }) => {
  return <MarkdownPreview source={source} />;
};

export default MarkdownPreviewClient;
