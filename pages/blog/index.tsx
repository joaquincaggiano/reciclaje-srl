import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

const BlogPage: NextPage = () => {
  return (
    <MainLayout title={content.blog.title} pageDescription={content.blog.pageDescription}>
        <div>BlogPage</div>
    </MainLayout>
  )
}

export default BlogPage;