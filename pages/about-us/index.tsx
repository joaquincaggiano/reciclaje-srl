import { NextPage } from "next";
import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";

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
          <img src="/todo-rec-logo-3.png" height="200px" />
          <img src="/reciclaje1.png" height="250px" />
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
