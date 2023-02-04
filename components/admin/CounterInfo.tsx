import { FC } from "react";

import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}

export const CounterInfo: FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          boxShadow: "0px 0px 0px 0px",
        }}
      >
        <CardContent
          sx={{
            width: 50,
          }}
        >
          {icon}
        </CardContent>

        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-evenly",
          }}
        >
          <Typography variant="h3" sx={{ fontSize: "26px" }}>
            {subTitle}:{" "}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: "20px" }}>
            {title}
          </Typography>
        </CardContent>
        
      </Card>
    </Grid>
  );
};
