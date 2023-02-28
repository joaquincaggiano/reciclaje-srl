import { FC, ReactNode } from "react";
import { useContext } from "react";
import Head from "next/head";
import { Navbar, SideMenu, Footer } from "../ui";
import { IconButton, Tooltip } from "@mui/material";
import { UnsubscribeOutlined } from "@mui/icons-material";
import { UiContext } from "@/context";
import { ModalSubscribe } from "../mailchimp";

interface Props {
  title: string;
  metaHeader: string;
  imageFullUrl?: string;
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({
  children,
  title,
  metaHeader,
  imageFullUrl,
}) => {
  const { toggleModalOpen } = useContext(UiContext);
  

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
          minHeight: "65vh",
        }}
      >
        <ModalSubscribe />
        {children}
        <Tooltip title="Suscríbete">
          <IconButton
            sx={{
              border: "1px solid #4caf50",
              position: "fixed",
              top: "80%",
              left: { xs: "85%", sm: "90%", md: "93%", lg: "95%" },
              "&:hover": { backgroundColor: "#4caf50" },
            }}
          >
            <UnsubscribeOutlined
              onClick={toggleModalOpen}
              sx={{
                fontSize: "30px",
                color: "#4caf50",
                "&:hover": { color: "#ffff" },
              }}
            />
          </IconButton>
        </Tooltip>
      </main>

      <Footer />
    </>
  );
};
