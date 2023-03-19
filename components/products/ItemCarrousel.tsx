import { FC } from "react";
import { Paper, CardMedia } from "@mui/material";

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