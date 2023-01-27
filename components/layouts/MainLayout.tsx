import { FC, ReactNode } from "react";
import Head from "next/head";
import { Navbar, SideMenu, Footer } from "../ui";

interface Props {
  title: string;
  metaHeader: string;
  imageFullUrl?: string;
  children: ReactNode
}

export const MainLayout: FC<Props> = ({
  children,
  title,
  metaHeader,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={metaHeader} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={metaHeader} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
          minHeight: "65vh"
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
};