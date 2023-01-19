import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

const BlogPage: NextPage = () => {
  return (
    <MainLayout title={content.blog.title} metaHeader={content.blog.metaHeader}>
        <div>BlogPage</div>
    </MainLayout>
  )
}

export default BlogPage;