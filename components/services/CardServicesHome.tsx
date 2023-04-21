import NextLink from "next/link";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  Grid,
  Link,
} from "@mui/material";
import { FC } from "react";
import { IServiceSchema } from "@/interfaces";

interface Props {
  service: IServiceSchema
}

export const CardServicesHome: FC<Props> = ({
  service 
}) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <NextLink href={`/services#${service.title}`} passHref legacyBehavior>
        <Button
          sx={{
            backgroundColor: "#008f39",
            width: "70%",
            height: "120%",
            "&:hover": { border: "2px solid #008f39" },
          }}
        >
          {service.title}
        </Button>
      </NextLink>
    </Grid>
  );
};
