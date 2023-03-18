import { FC } from "react";
import { IBlogSchema } from "@/interfaces";
import { Grid, Typography } from "@mui/material";
import useSWR from "swr";
import { BlogCard } from "./BlogCard";

export const BlogList: FC = () => {
  const { data, error } = useSWR<IBlogSchema[]>("/api/blog");
  console.log("data blog", data)

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
      {data!.map((blog, i) => {
        return <BlogCard blog={blog} key={i} />;
      })}
    </Grid>
  );
};
