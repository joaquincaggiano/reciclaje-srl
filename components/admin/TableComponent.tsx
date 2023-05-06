import { FC, useState } from "react";

import { useRouter } from "next/router";

import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import { dataBlog } from "@/pages/admin/blog";
import { dataProducts } from "@/pages/admin/products";
import { dataServices } from "@/pages/admin/services";
import { dataUsers } from "@/pages/admin/users";


interface Props {
  data: dataBlog[] | dataProducts[] | dataServices[];
  typeS3: string;
  urlKit: string;
}

export const TableComponent: FC<Props> = ({ data, typeS3, urlKit }) => {
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

  const deleteButton = async (id: string, img: string[]) => {
    try {
      //@ts-ignore
      const imageToDelete = await axios.delete(`/api/admin/${typeS3}?id=${id}`);

      if (imageToDelete.status === 200) {
        img.map(async (eachImage) => {
          const imageUrlKit = "https://ik.imagekit.io/e2ouoknyw/" + urlKit;
          const imageName = eachImage.split(imageUrlKit).join(typeS3)
          await axios.post("/api/admin/deleteImageFromS3", {
            key: imageName,
          });
        });
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rowNames = data.length > 0 ? (Object.keys(data[0]).map((key, i) => {
      if (key === "id"){
        return;
      }else{
        return <TableCell key={i}>{key}</TableCell>;
      }
    })) : ("no rows to show");

    const columnArray:string[] = []
  const columnFills = data.length > 0 ?  (Object.keys(data[0]).map((key, i) => {
    if (key == "id" || key == "images" || key == "title"){
      return;
    }else{
      return columnArray.push(key)
    }
  })) : ("no columns to show");

  return (
    <Grid container className="fadeIn">
      <Grid item xs={12} sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {rowNames}
                <TableCell>Borrar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsToShow.map((row, index) => (
                <TableRow key={index}>
                  {/* @ts-ignore */}
                  {row!.images?.length > 0 && 
                  <TableCell>
                    <Image
                     //@ts-ignore
                      src={row.images[0]}
                       //@ts-ignore
                      alt={row.title}
                      width={100}
                      height={80}
                    />
                  </TableCell>
                  }
                  <TableCell>
                    <NextLink
                     //@ts-ignore
                      href={`/admin/${typeS3}/${row.title}`}
                      passHref
                      legacyBehavior
                    >
                      {/* @ts-ignore */}
                      <Link underline="always">{row.title}</Link>
                    </NextLink>
                  </TableCell>
                  {columnArray.map((eachKey, i)=>{
                    //@ts-ignore
                    return <TableCell key={i}>{row[eachKey]}</TableCell>
                  })}
                  {/* @ts-ignore */}
                  <TableCell onClick={() => deleteButton(row.id, row.images)}>
                    <Button
                     //@ts-ignore
                      onClick={() => deleteButton(row.id, row.images)}
                      color="error"
                      sx={{
                        "&:hover": {
                          color: "#ffff",
                          backgroundColor: "#d32f2f",
                        },
                      }}
                    >
                      Borrar
                    </Button>
                  </TableCell>
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
