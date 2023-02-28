import { useState, useEffect } from "react";

import NextLink from "next/link";

import useSWR from "swr";

import { CounterInfo } from "@/components/admin";
import { MainLayout } from "@/components/layouts";
import {
  AccessTimeOutlined,
  CategoryOutlined,
  GroupOutlined,
  NewspaperOutlined,
  PrecisionManufacturing,
} from "@mui/icons-material";
import { Grid, Link, Typography } from "@mui/material";

import { DashboardCounterResponse } from "@/interfaces";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardCounterResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000, // 30segundos
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numbersOfProducts,
    numbersOfServices,
    numbersOfBlogs,
    numbersOfSubscribes,
  } = data!;

  return (
    <MainLayout
      title="Dashboard General"
      metaHeader="Mantenimiento general del dashboard"
    >
      <Grid container display="flex" justifyContent="space-evenly" flexWrap="wrap" spacing={2}>
        <Grid item sx={{ width: "100%" }}>
          <NextLink href="/admin/products" passHref legacyBehavior>
            <Link>
              <CounterInfo
                icon={<CategoryOutlined color="error" sx={{ fontSize: 40 }} />}
                title={numbersOfProducts}
                subTitle={"Productos"}
              />
            </Link>
          </NextLink>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <NextLink href="/admin/services" passHref legacyBehavior>
            <Link>
              <CounterInfo
                icon={
                  <PrecisionManufacturing
                    color="warning"
                    sx={{ fontSize: 40 }}
                  />
                }
                title={numbersOfServices}
                subTitle={"Servicios"}
              />
            </Link>
          </NextLink>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <NextLink href="/admin/blog" passHref legacyBehavior>
            <Link>
              <CounterInfo
                icon={
                  <NewspaperOutlined sx={{ fontSize: 40, color: "#3C99DC" }} />
                }
                title={numbersOfBlogs}
                subTitle={"Blog"}
              />
            </Link>
          </NextLink>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <NextLink href="/admin/users" passHref legacyBehavior>
            <Link>
              <CounterInfo
                icon={<GroupOutlined sx={{ fontSize: 40, color: "#4caf50" }} />}
                title={numbersOfSubscribes}
                subTitle={"Suscriptores"}
              />
            </Link>
          </NextLink>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <CounterInfo
            icon={
              <AccessTimeOutlined sx={{ fontSize: 40, color: "#3A64D8" }} />
            }
            title={refreshIn}
            subTitle={"Refresh"}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default DashboardPage;
