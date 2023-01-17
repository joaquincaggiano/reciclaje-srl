import { MainLayout } from "../components/layouts";
import { content } from "@/utils";

export default function Home() {
  return (
    <MainLayout title={content.home.title} pageDescription={content.home.pageDescription}>
      <h1>HOLA MUNDO</h1>
    </MainLayout>
  )
}
