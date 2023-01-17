import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

const ProductsPage = () => {
  return (
    <MainLayout title={content.products.title} pageDescription={content.products.pageDescription}>
        <div>ProductsPage</div>
    </MainLayout>
  )
}

export default ProductsPage;