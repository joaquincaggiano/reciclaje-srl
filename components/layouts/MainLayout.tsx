import { FC, ReactNode } from "react";
import { useContext } from "react";
import { UiContext } from "@/context";

import Head from "next/head";
import NextLink from "next/link";

import { Navbar, SideMenu, Footer } from "../ui";
import { ModalSubscribe } from "../mailchimp";

import { IconButton, Link, Tooltip } from "@mui/material";
import { UnsubscribeOutlined } from "@mui/icons-material";

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
        <Tooltip title="Suscríbete" onClick={toggleModalOpen}>
          <IconButton
            sx={{
              border: "1px solid #4caf50",
              position: "fixed",
              top: "80%",
              left: { xs: "77%", sm: "88%", md: "91%", lg: "93%", xl: "95.4%" },
              "&:hover": { backgroundColor: "#4caf50" },
            }}
          >
            <UnsubscribeOutlined
              sx={{
                fontSize: "50px",
                color: "#4caf50",
                "&:hover": { color: "#ffff" },
              }}
            />
          </IconButton>
        </Tooltip>

        <IconButton
          sx={{
            position: "fixed",
            top: { xs: "72%", xl: "70%" },
            left: { xs: "75%", sm: "87%", md: "90%", lg: "92.2%", xl: "95%" },
          }}
        >
          <NextLink
            href="https://wa.me/+5493416957516"
            passHref
            legacyBehavior
            replace={true}
          >
            <Link>
              <img src="/whatsapp.png" style={{ width: "65px" }} />
            </Link>
          </NextLink>
        </IconButton>
      </main>

      <Footer />
    </>
  );
};
