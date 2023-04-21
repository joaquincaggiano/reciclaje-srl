import { FC, ReactNode } from "react";
import { useContext } from "react";
import { UiContext } from "@/context";

import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";

import { Navbar, SideMenu, Footer } from "../ui";
import { ModalSubscribe } from "../mailchimp";

import { IconButton, Link, Tooltip } from "@mui/material";
import { UnsubscribeOutlined } from "@mui/icons-material";
import { content } from "@/utils";

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
              border: "1px solid #008f39",
              zIndex: "10000000000",
              position: "fixed",
              top: "73%",
              left: { xs: "77%", sm: "88%", md: "91%", lg: "93%", xl: "95.4%" },
              "&:hover": { backgroundColor: "#008f39" },
            }}
          >
            <UnsubscribeOutlined
              sx={{
                fontSize: "50px",
                color: "#008f39",
                "&:hover": { color: "#ffff" },
              }}
            />
          </IconButton>
        </Tooltip>

        <IconButton
          sx={{
            position: "fixed",
            top: { xs: "65%", xl: "63%" },
            left: { xs: "75%", sm: "87%", md: "90%", lg: "92.2%", xl: "95%" },
            zIndex: "10000000000",
          }}
        >
          <NextLink
            href={`https://wa.me/${content.contact.datosContacto.whatsapp}`}
            passHref
            legacyBehavior
            replace={true}
          >
            <Link>
              <Image src="/whatsapp.png" width={65} height={65} alt={"whatsapp logo"} />
            </Link>
          </NextLink>
        </IconButton>
      </main>

      <Footer />
    </>
  );
};
