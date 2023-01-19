import { FC } from "react";
import { Paper, CardMedia } from "@mui/material";

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
