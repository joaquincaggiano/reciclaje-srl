import { useState, useEffect } from "react";

import useSWR from "swr";

import { CounterInfo } from "@/components/admin";
import { MainLayout } from "@/components/layouts";

import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import GroupOutlined from "@mui/icons-material/GroupOutlined";
import NewspaperOutlined from "@mui/icons-material/NewspaperOutlined";
import PrecisionManufacturing from "@mui/icons-material/PrecisionManufacturing";


import Typography  from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

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
      <Grid container spacing={2}>
        <CounterInfo
          icon={<CategoryOutlined color="error" sx={{ fontSize: 40 }} />}
          title={numbersOfProducts}
          subTitle={"Productos"}
          url={"/admin/products"}
        />

        <CounterInfo
          icon={
            <PrecisionManufacturing color="warning" sx={{ fontSize: 40 }} />
          }
          title={numbersOfServices}
          subTitle={"Servicios"}
          url={"/admin/services"}
        />

        <CounterInfo
          icon={<NewspaperOutlined sx={{ fontSize: 40, color: "#3C99DC" }} />}
          title={numbersOfBlogs}
          subTitle={"Blog"}
          url={"/admin/blog"}
        />

        <CounterInfo
          icon={<GroupOutlined sx={{ fontSize: 40, color: "#4caf50" }} />}
          title={numbersOfSubscribes}
          subTitle={"Suscriptores"}
          url={"/admin/users"}
        />

        <CounterInfo
          icon={<AccessTimeOutlined sx={{ fontSize: 40, color: "#3A64D8" }} />}
          title={refreshIn}
          subTitle={"Refresh"}
          url=""
        />
      </Grid>
    </MainLayout>
  );
};

export default DashboardPage;
