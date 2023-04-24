import { FC, useState } from "react";
import { IBlogSchema } from "@/interfaces";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import {IconButtonProps } from "@mui/material";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography  from "@mui/material/Typography";

import { green } from "@mui/material/colors";


import {
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import { ShareComponent } from "../ui";

interface Props {
  blog: IBlogSchema;
  getImageUrl: (url: string) => void;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const BlogCard: FC<Props> = ({ blog, getImageUrl }) => {
  const [openShareOptions, setOpenShareOptions] = useState<Boolean>(false);
  const [expanded, setExpanded] = useState(false);

  const shareFunction = () => {
    const awsUrl = blog.images[0].replace(
      "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/",
      ""
    );
    const optimizedUrl = `https://ik.imagekit.io/e2ouoknyw/${awsUrl}`;
    getImageUrl(optimizedUrl);
    setOpenShareOptions(true);
  };

  //@ts-ignore
  const date = new Date(blog?.createdAt);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); 
  const year = date.getUTCFullYear().toString().slice(-2);

  const actualDate = `${day}-${month}-${year}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
              T
            </Avatar>
          }
          title={blog.title}
          subheader={actualDate}
        />
        <CardMedia
          component="img"
          height="194"
          image={blog.images[0]}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {blog.description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="share" onClick={shareFunction}>
            <ShareIcon />
          </IconButton>

          {openShareOptions && (
            <ShareComponent link={blog}/>
          )}

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{blog.info}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
