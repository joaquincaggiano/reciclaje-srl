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

interface Props {
  title: string;
  description: string;
  image: string;
}

export const CardServicesHome: FC<Props> = ({ title, description, image, }) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Card sx={{ width: 320, minHeight: 370 }}>
        <CardActionArea>
          <CardMedia component="img" height="200" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.slice(0, 70) + "..."}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <NextLink href={`/services#${title}`} passHref legacyBehavior>
            <Link>
              <Button size="small" color="primary">
                Ver más
              </Button>
            </Link>
          </NextLink>
        </CardActions>
      </Card>
    </Grid>
  );
};
