import { FC, useContext } from "react";
import { UiContext } from "@/context";
import EmailOutlined from '@mui/icons-material/EmailOutlined'

import Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";

import React from 'react'

export const NotBlogsMessage: FC = () => {
    const { toggleModalOpen } = useContext(UiContext);
  return (
    <Box
          sx={{ mt: "150px", width: "100%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" textAlign="center" sx={{fontSize: "28px", mb: 3}}>
            Ups! aún no hay novedades...
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <EmailOutlined sx={{ color: "#008f39", mr: 1, fontSize: "28px" }} />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ flexDirection: { xs: "column", sm: "row" }, textAlign: "center" }}
            >
              <Typography
                variant="h2"
                sx={{
                  textDecoration: "underline",
                  textDecorationColor: "#008f39",
                  cursor: "pointer",
                  fontSize: "28px"
                }}
                onClick={toggleModalOpen}
              >
                Suscríbete
              </Typography>
              <Typography variant="h2" sx={{ ml: 1, fontSize: "28px" }}>
                y sé el primero en conocer todas las noticias!
              </Typography>{" "}
            </Box>
          </Box>
        </Box>
  )
}
