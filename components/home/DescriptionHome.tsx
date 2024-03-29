import { content } from "@/utils";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const DescriptionHome = () => {
  return (
    <>
      {content.home.descriptionInfo.split("\n").map((line, index) => (
        <Box
          sx={{ width: "70%" }}
          key={index}
          className="MuiTypography-gutterBottom"
        >
          <Typography
            variant="body1"
            component="div"
            // textAlign="justify"
            sx={{ fontSize: "22px", textAlign: { md: "justify" } }}
          >
            {line}
          </Typography>
          <br />
        </Box>
      ))}
    </>
  );
};
