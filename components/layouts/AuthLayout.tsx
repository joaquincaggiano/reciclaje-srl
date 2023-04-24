import { FC, ReactNode } from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import { Footer, Navbar, SideMenu } from "../ui";

interface Props {
  title: string;
  children: ReactNode
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 180px)"
        >
          {children}
        </Box>
      </main>

      <Footer />
    </>
  );
};
