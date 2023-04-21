import React from "react";
import { NextPage } from "next";
import Image from 'next/image'
import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";
import { Box, Divider, Typography } from "@mui/material";

const AboutUsPage: NextPage = () => {

  const lines = content.aboutUs.description.split("\n").map((line, index) => (
    <div key={index} className="MuiTypography-gutterBottom">
      <br/>
      {line}
      <br/>
    </div>
  ));

  return (
    <MainLayout
      title={content.aboutUs.title}
      metaHeader={content.aboutUs.metaHeader}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography variant="h1">{content.aboutUs.metaHeader}</Typography>
        <Divider
          sx={{
            border: "1px solid #008f39",
            width:"70%",
            mt: 1,
            mb: 5,
          }}
        />
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="baseline"
          sx={{ width: "100%", mb: 3 }}
        >
          <Image src="/todo-rec-logo-3.png" width={380} height={200} alt="todorec logo" />
          <Image src="/reciclaje1.png" width={380} height={250} alt="reciclaje logo"/>
        </Box>
        
        <Box sx={{width: "70%"}}>
          <Typography
              variant="body1"
              component="div"
              textAlign="justify"
              sx={{ fontSize: "22px" }}
            >
              {lines}
          </Typography>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default AboutUsPage;
