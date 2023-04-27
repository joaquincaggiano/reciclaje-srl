import { useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { content } from "@/utils";

import Divider from "@mui/material/Divider";
import Typography  from "@mui/material/Typography";

const DynamicMainLayout = dynamic(() =>
  import("../../components/layouts").then((mod) => mod.MainLayout)
);
const DynamicBlogList = dynamic(() =>
import("../../components/blog").then((mod) => mod.BlogList)
);

const BlogPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("")

  function getImageUrl(url: string){
    return setImageUrl(url)
  }

  return (
    <DynamicMainLayout title={content.blog.title} metaHeader={content.blog.metaHeader}>
      <Typography variant="h1" sx={{ textAlign: "center", mb: 2 }}>
        {content.blog.title}
      </Typography>

      <Divider sx={{ mb: 5 }} />

      <DynamicBlogList getImageUrl={getImageUrl}/>
    </DynamicMainLayout>
  );
};

export default BlogPage;
