import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

const ServicesPage = () => {
  return (
    <MainLayout title={content.services.title} pageDescription={content.services.pageDescription}>
        <div>ServicesPage</div>
    </MainLayout>
  )
}

export default ServicesPage;