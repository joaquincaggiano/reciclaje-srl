import { NextPage } from "next";

import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

import { Typography, Divider } from "@mui/material";
import { BlogList } from "@/components/blog";

const BlogPage: NextPage = () => {
  return (
    <MainLayout title={content.blog.title} metaHeader={content.blog.metaHeader}>
      <Typography variant="h1" sx={{ textAlign: "center", mb: 2 }}>
        {content.blog.title}
      </Typography>

      <Divider sx={{ mb: 5 }} />

      <BlogList />
    </MainLayout>
  );
};

export default BlogPage;
