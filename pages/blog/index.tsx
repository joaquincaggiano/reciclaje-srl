import { useState } from "react";
import { NextPage } from "next";

import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

import  Divider from "@mui/material/Divider";
import Typography  from "@mui/material/Typography";
import { BlogList } from "@/components/blog";

const BlogPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("")

  function getImageUrl(url: string){
    return setImageUrl(url)
  }

  return (
    <MainLayout title={content.blog.title} metaHeader={content.blog.metaHeader}>
      <Typography variant="h1" sx={{ textAlign: "center", mb: 2 }}>
        {content.blog.title}
      </Typography>

      <Divider sx={{ mb: 5 }} />

      <BlogList getImageUrl={getImageUrl}/>
    </MainLayout>
  );
};

export default BlogPage;
