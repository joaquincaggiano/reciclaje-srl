import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

const BlogPage = () => {
  return (
    <MainLayout title={content.blog.title} pageDescription={content.blog.pageDescription}>
        <div>BlogPage</div>
    </MainLayout>
  )
}

export default BlogPage;