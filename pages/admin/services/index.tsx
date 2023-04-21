import { MainLayout } from "@/components/layouts";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import axios from "axios";
import useSWR from "swr";
import { IServiceSchema } from "@/interfaces";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const Services = () => {
  const { data, error } = useSWR<IServiceSchema[]>("/api/admin/services");
  const router = useRouter();

  if (!data && !error) return <></>;

  const columns: GridColDef[] = [
    {
      field: "img",
      headerName: "Imagen",
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <CardMedia
            component="img"
            alt={row.titile}
            className="fadeIn"
            image={row.img[0]}
          />
        );
      },
    },
    {
      field: "title",
      headerName: "Titulo",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <NextLink
            href={`/admin/services/${row.title}`}
            passHref
            legacyBehavior
          >
            <Link underline="always">{row.title}</Link>
          </NextLink>
        );
      },
    },
    { field: "description", headerName: "Descripción", width: 700 },
    {
      field: "Borrar",
      headerName: "Borrar",
      width: 100,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Button
            onClick={() => deleteBlog(row.id, row.img)}
            color="error"
            sx={{ "&:hover": { color: "#ffff", backgroundColor: "#d32f2f" } }}
          >
            Borrar
          </Button>
        );
      },
    },
  ];

  const rows = data!.map((service) => {
    return {
      id: service._id,
      title: service.title,
      img: service.images,
      description: service.description,
    };
  });

  const deleteBlog = async (id: string, img: string[]) => {
    try {
      //@ts-ignore
      const blogToDelete = await axios.delete(`/api/admin/services?id=${id}`);

      if (blogToDelete.status === 200) {
        img.map(async (eachImage) => {
          const imageName = eachImage.replace(
            "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/",
            ""
          );
          await axios.post("/api/admin/deleteImageFromS3", {
            key: `${imageName}`,
          });
        });
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Services;
