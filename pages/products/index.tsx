import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

const ProductsPage: NextPage = () => {
  return (
    <MainLayout title={content.products.title} pageDescription={content.products.pageDescription}>
        <div>ProductsPage</div>
    </MainLayout>
  )
}

export default ProductsPage;