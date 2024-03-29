import { FC, ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { UiContext } from "@/context";

import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";

import IconButton from "@mui/material/IconButton";

import EmailOutlined from "@mui/icons-material/EmailOutlined";
import { content } from "@/utils";
import { Box } from "@mui/material";
import { FullScreenLoading } from "../ui";

const DynamicNavbar = dynamic(() => import("../ui").then((mod) => mod.Navbar), {suspense: true});
const DynamicSideMenu = dynamic(() =>
  import("../ui").then((mod) => mod.SideMenu), {suspense: true}
);
const DynamicFooter = dynamic(() => import("../ui").then((mod) => mod.Footer), {suspense: true});
const DynamicModalSubscribe = dynamic(() =>
  import("../../components/mailchimp").then((mod) => mod.ModalSubscribe), {suspense: true}
);

interface Props {
  title: string;
  metaHeader: string;
  imageFullUrl?: string;
  url?: string;
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

        {imageFullUrl && <meta property="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <DynamicNavbar />
      </nav>

      <DynamicSideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
          minHeight: "65vh",
        }}
      >
        <DynamicModalSubscribe />
        <Suspense fallback={<FullScreenLoading />}>
       
        {children}
        </Suspense>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            zIndex: "10000000000",
            position: "fixed",
            top: "60%",
            left: { xs: "77%", sm: "85%", md: "90%", lg: "93%", xl: "95.4%" },
            // height: "200px",
            // border: "3px solid red"
          }}
        >
          <IconButton
            sx={{
              border: "1px solid #008f39",
              "&:hover": { backgroundColor: "#008f39" },
            }}
            onClick={toggleModalOpen}
          >
            <EmailOutlined
              sx={{
                fontSize: "50px",
                color: "#008f39",
                "&:hover": { color: "#ffff" },
              }}
            />
          </IconButton>

          <IconButton>
            <NextLink
              href={`https://wa.me/${content.contact.datosContacto.whatsapp}`}
              passHref
              legacyBehavior
              replace={true}
            >
              <a target="_blank" rel="noopener noreferrer">
                <Image
                  src="/whatsapp.png"
                  width={65}
                  height={65}
                  alt={"whatsapp logo"}
                />
              </a>
            </NextLink>
          </IconButton>
        </Box>
      </main>

      <DynamicFooter />
    </>
  );
};
