import { NextPage } from "next";
import dynamic from 'next/dynamic'
import Image from "next/image";

import { content } from "@/utils";

import  Box from "@mui/material/Box";
import  Divider from "@mui/material/Divider";
import Typography  from "@mui/material/Typography";

const DynamicMainLayout = dynamic(() =>
  import("../../components/layouts").then((mod) => mod.MainLayout)
);

const AboutUsPage: NextPage = () => {
  const lines = content.aboutUs.description.split("\n").map((line, index) => (
    <div key={index} className="MuiTypography-gutterBottom">
      <br />
      {line}
      <br />
    </div>
  ));

  return (
    <DynamicMainLayout
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
            width: "70%",
            mt: 1,
            mb: 5,
          }}
        />

        <Image
          src="https://ik.imagekit.io/e2ouoknyw/BannersTodoRec/todo-rec-logo-3.png"
          layout="intrinsic"
          width={380}
          height={200}
          alt="todorec logo"
        />

        <Box sx={{ width: "70%" }}>
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
    </DynamicMainLayout>
  );
};

export default AboutUsPage;
