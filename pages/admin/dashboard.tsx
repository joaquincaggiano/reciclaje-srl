import { useState, useEffect } from "react";

import useSWR from "swr";

import { CounterInfo } from "@/components/admin";
import { MainLayout } from "@/components/layouts";
import { AccessTimeOutlined, CategoryOutlined, NewspaperOutlined, PrecisionManufacturing } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

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

  const { numbersOfProducts, numbersOfServices, numbersOfBlogs } = data!;

  return (
    <MainLayout
      title="Dashboard General"
      metaHeader="Mantenimiento general del dashboard"
    >
      <Grid container spacing={2}>
        <CounterInfo
          icon={<CategoryOutlined color="error" sx={{ fontSize: 40 }} />}
          title={numbersOfProducts}
          subTitle={"Productos"}
        />
        <CounterInfo
          icon={<PrecisionManufacturing color="warning" sx={{ fontSize: 40 }} />}
          title={numbersOfServices}
          subTitle={"Servicios"}
        />
        <CounterInfo
          icon={<NewspaperOutlined sx={{ fontSize: 40, color: "#3C99DC" }} />}
          title={numbersOfBlogs}
          subTitle={"Blog"}
        />
        <CounterInfo
          icon={<AccessTimeOutlined sx={{ fontSize: 40, color: "#3A64D8" }} />}
          title={refreshIn}
          subTitle={"Refresh"}
        />
      </Grid>
    </MainLayout>
  );
};

export default DashboardPage;
