import { MainLayout } from "@/components/layouts";
import { TableComponent } from "@/components/admin";

import useSWR from "swr";
import { IBlogSchema } from "@/interfaces";

import Box from "@mui/material/Box";
import AddOutlined from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";

export interface dataBlog {
    id: string;
    images: string[];
    title: string;
    info: string;
    description: string;
}

const Blog = () => {
  const { data, error } = useSWR<IBlogSchema[]>("/api/admin/blog");
  if (!data && !error) return <></>;
  
  const dataBlog:dataBlog[] = data!.map((eachData) => {
    return {
      id: eachData._id,
      images: eachData.images,
      title: eachData.title,
      info: eachData.info,
      description: eachData.description,
    }
  })

  return (
    <MainLayout title="Blog-Dashboard" metaHeader="Administración del Blog">
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/blog/new"
          sx={{ color: "white", backgroundColor: "#008f39" }}
        >
          Crear blog
        </Button>
      </Box>

      <TableComponent data={dataBlog} typeS3="blog" urlKit="BlogTodoRec"/>
    </MainLayout>
  );
};

export default Blog;
