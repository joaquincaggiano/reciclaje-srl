import { FC } from "react";

import  Paper  from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";


interface Props {
  image: string;
}

export const Item: FC<Props> = (props) => {
  return (
    <Paper>
      <CardMedia
        sx={{ height: { xs: 200, sm: 400, md: 600 }, width: "100%" }}
        component="img"
        image={props.image}
      />
    </Paper>
  );
};
