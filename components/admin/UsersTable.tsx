import { FC, useState } from "react";

import { useRouter } from "next/router";

import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import { dataUsers } from "@/pages/admin/users";


interface Props {
  data: dataUsers[];
}

export const UsersTable: FC<Props> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const router = useRouter();

  //@ts-ignore
  const handleChangePage = (e, newPage) => {
    setCurrentPage(newPage);
  };

  //@ts-ignore
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const rowsToShow = data!.slice(startIndex, endIndex);

  const rowNames = data.length > 0 ? (Object.keys(data[0]).map((key, i) => {
      if (key === "id"){
        return;
      }else{
        return <TableCell key={i}>{key}</TableCell>;
      }
    })) : ("no rows to show");

  return (
    <Grid container className="fadeIn">
      <Grid item xs={12} sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {rowNames}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsToShow.map((row: any, index) => (
                <TableRow key={index}>
              
                  <TableCell >{row.email}</TableCell>
                  <TableCell >{row.status}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={data!.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};
