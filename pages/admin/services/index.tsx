import dynamic from 'next/dynamic';

import useSWR from "swr";
import { IServiceSchema } from "@/interfaces";

import Button from "@mui/material/Button";
import  Box from "@mui/material/Box";
import AddOutlined from "@mui/icons-material/AddOutlined";

import {MainLayout} from '../../../components/layouts'

const DynamicMainLayout = dynamic(() =>
  import("../../../components/layouts").then((mod) => mod.MainLayout)
);
const DynamicTableComponent = dynamic(() =>
  import("../../../components/admin").then((mod) => mod.TableComponent)
);

export interface dataServices {
  id: string;
  images: string[];
  title: string;
  description: string;
}

const Services = () => {
  const { data, error } = useSWR<IServiceSchema[]>("/api/admin/services");
  if (!data && !error) return <></>;

  const dataServices:dataServices[] = data!.map((service) => {
    return {
      id: service._id,
      images: service.images,
      title: service.title,
      description: service.description,
    };
  });

  return (
    <MainLayout
      title="Services-Dashboard"
      metaHeader="Administración de los servicios"
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/services/new"
          sx={{ color: "white", backgroundColor: "#008f39" }}
        >
          Crear servicio
        </Button>
      </Box>

      <DynamicTableComponent data={dataServices} typeS3="services" urlKit="ServiceTodoRec"/>
     
    </MainLayout>
  );
};

export default Services;
