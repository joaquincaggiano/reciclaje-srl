import Grid  from "@mui/material/Grid";
import { FC } from "react";
import { IServiceSchema } from "../../interfaces/services";
import { ServiceCard } from ".";

interface Props {
  services: IServiceSchema[];
}

export const ServicesList: FC<Props> = ({ services }) => {
  return (
    <Grid container spacing={2}>
      {services.map((service, i) => {
        return <ServiceCard service={service} key={i} />;
      })}
    </Grid>
  );
};
