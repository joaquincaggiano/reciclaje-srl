// import { useState } from "react";

import { NextPage } from "next";

import { MainLayout } from "@/components/layouts";
import { content } from "@/utils";

// import useSWR from "swr";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  IconButtonProps,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { BlogList } from "@/components/blog";

// import {
//   Share as ShareIcon,
//   ExpandMore as ExpandMoreIcon,
// } from "@mui/icons-material";

// import { styled } from "@mui/material/styles";
// import { red } from "@mui/material/colors";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const BlogPage: NextPage = () => {
  // const { data, error } = useSWR<IBlogSchema[]>("/api/blog");

  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  // if (!error && !data) {
  //   return <></>;
  // }

  // if (error) {
  //   console.log(error);
  //   return <Typography>Error al cargar la información</Typography>;
  // }

  return (
    <MainLayout title={content.blog.title} metaHeader={content.blog.metaHeader}>
      <Typography variant="h1" sx={{textAlign: "center", mb: 2}}>{content.blog.title}</Typography>

      <Divider sx={{mb:5}}/>

      <BlogList />

      {/* <Grid container spacing={4} display="flex" justifyContent="space-evenly" alignItems="center">
        {data!.map((blog, i) => {
          return (
            <Grid item key={i}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title={blog.title}
                  subheader={blog.createdAt}
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
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
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
        })}
      </Grid> */}
    </MainLayout>
  );
};

export default BlogPage;
