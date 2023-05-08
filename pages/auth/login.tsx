import { useState } from "react";
import { Router, useRouter } from "next/router";
// import dynamic from 'next/dynamic'

import { GetServerSideProps } from "next";

// NextAuth
import { getSession, signIn } from "next-auth/react";

import { validations } from "@/utils";

import { ErrorOutline } from "@mui/icons-material";
import Button from "@mui/material/Button";
import  Chip  from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import  Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";

// const DynamicAuthLayout = dynamic(() =>
// import("../../components/layouts").then((mod) => mod.AuthLayout)
// );

import { AuthLayout } from "../../components/layouts";

import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const onLoginUser = async ({ email, password }: FormData) => {
    // console.log("email", email)
    // console.log("password", password)
    try {
      const user = await signIn("credentials", { email, password, redirect: false });
      // console.log("user sign in", user)
      //@ts-ignore
      if(user?.status !== 200) {
        setShowError(true);
      } else {
        setShowError(false);
        // router.push("https://www.todorec.com.ar/")
        console.log("EL ROUTER", router)
        router.reload()
      }
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>

             <Chip
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email} //el !! hace que sea un valor booleano
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                sx={{
                  border: "1px solid #008f39",
                  "&:hover": { backgroundColor: "#008f39", color: "white" },
                }}
              >
                Ingresar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  // query,
}) => {
  const session = await getSession({ req });

  // const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
