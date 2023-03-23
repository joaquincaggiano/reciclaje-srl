import { FC } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IServiceSchema } from "@/interfaces";

interface Props {
  service: IServiceSchema;
}

export const ServiceCard: FC<Props> = ({ service }) => {
  return (
    <Grid
      item
      xs={12}
      // sm={6}
      // md={4}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Card
        sx={{
          width: "100%",
          boxShadow: "0px 0px 0px 0px",
        }}
        id={`${service.title}`}
      >
        <CardContent>
          <Typography
            variant="h2"
            component="div"
            sx={{ textAlign: "center", fontSize: "30px" }}
          >
            {service.title}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="500"
          image={service.images[0]}
          alt={service.title}
         
        />
        <CardContent>
          <Typography variant="body1" sx={{ fontSize: "20px" }}>
            {service.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
