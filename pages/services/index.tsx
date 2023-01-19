import { MainLayout } from "@/components/layouts";
import { NextPage } from "next";

import { content } from "@/utils";

const ServicesPage: NextPage = () => {
  return (
    <MainLayout title={content.services.title} metaHeader={content.services.metaHeader}>
        <div>ServicesPage</div>
    </MainLayout>
  )
}

export default ServicesPage;