import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import {content} from "../../utils";

const ContactPage: NextPage = () => {
  return (
    <MainLayout title={content.contact.title} metaHeader={content.contact.metaHeader}>
        <div>ContactPage</div>
    </MainLayout>
  )
}

export default ContactPage;