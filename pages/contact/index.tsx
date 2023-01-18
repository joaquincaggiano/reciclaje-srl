import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import {content} from "../../utils";

const ContactPage: NextPage = () => {
  return (
    <MainLayout title={content.contact.title} pageDescription={content.contact.pageDescription}>
        <div>ContactPage</div>
    </MainLayout>
  )
}

export default ContactPage;