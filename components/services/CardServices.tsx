import { Card, CardActions, CardContent, CardMedia, Button, Typography  } from "@mui/material";
import { FC } from "react";

interface Props {
    title: string;
    description: string;
    image: string;
}

export const CardServices: FC<Props> = ({title, description, image}) => {
  return (
    <Card sx={{ maxWidth: 345, border: "1px solid #388e3c", mb: {xs: 4, md: 0} }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{color: "black"}}>Ver más</Button>
      </CardActions>
    </Card>
  )
}
