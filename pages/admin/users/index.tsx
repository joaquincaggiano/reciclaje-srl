import { MainLayout } from "@/components/layouts";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";
import { ISubscribe } from "@/interfaces";
import { Grid } from "@mui/material";

const columns: GridColDef[] = [
  { field: "email", headerName: "Email", width: 700 },
];

const Users = () => {
  const { data, error } = useSWR<ISubscribe[]>("/api/admin/subscribe");

  if (!data && !error) return <></>;

  const rows = data!.map((subscribe) => {
    return {
      id: subscribe._id,
      email: subscribe.email,
    };
  });

  return (
    <MainLayout
      title="Users-Dashboard"
      metaHeader="Administración de los usuarios"
    >
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

export default Users;
