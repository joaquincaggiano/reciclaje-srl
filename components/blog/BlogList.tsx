import { FC } from "react";

import useSWR from "swr";
import { BlogCard } from "./BlogCard";
import { IBlogSchema } from "@/interfaces";

import { Grid, Typography } from "@mui/material";
import { NotBlogsMessage } from "./NotBlogsMessage";

interface Props {
  getImageUrl: (url: string) => void;
}

export const BlogList: FC<Props> = ({ getImageUrl }) => {
  const { data, error } = useSWR<IBlogSchema[]>("/api/blog");

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }
  return (
    <Grid
      container
      spacing={4}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {data!.length === 0 ? (
        <NotBlogsMessage />
      ) : (
        data!.map((blog, i) => {
          return <BlogCard blog={blog} key={i} getImageUrl={getImageUrl} />;
        })
      )}
    </Grid>
  );
};
