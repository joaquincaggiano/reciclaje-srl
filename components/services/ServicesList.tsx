import { Grid } from "@mui/material";
import { FC } from "react";
import { IServiceSchema } from "../../interfaces/services";
import { ServiceCard } from ".";

interface Props {
  services: IServiceSchema[];
}

export const ServicesList: FC<Props> = ({ services }) => {
  return (
    <Grid container spacing={4}>
      {services.map((service, i) => {
        return <ServiceCard service={service} key={i} />;
      })}
    </Grid>
  );
};
