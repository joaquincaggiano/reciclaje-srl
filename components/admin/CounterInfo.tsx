import { FC } from "react";

import NextLink from "next/link";

import CardContent from "@mui/material/CardContent";
import Typography  from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Link  from "@mui/material/Link";


interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
  url: string;
}

export const CounterInfo: FC<Props> = ({ title, subTitle, icon, url }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <NextLink href={url} passHref legacyBehavior>
        <Link>
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
        </Link>
      </NextLink>
    </Grid>
  );
};
