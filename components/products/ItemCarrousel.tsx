import { FC } from "react";
import  Paper  from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";


interface Props {
  image: string;
}

export const ItemCarrousel: FC<Props> = (props) => {
  return (
    <Paper>
      <CardMedia
        sx={{ height: "200px"}}
        component="img"
        image={props.image}
      />
    </Paper>
  );
};