import { useContext, useState } from "react";
import { AuthContext } from "@/context";

import { GetServerSideProps } from "next";

// NextAuth
import { getSession, signIn } from "next-auth/react";

import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";

import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  // Divider,
  Grid,
  // Link,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {

  // const router = useRouter()

  // const {loginUser} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onLoginUser = async({email, password}: FormData) => {
    setShowError(false);

    await signIn("credentials", { email, password });
    // const isValidLogin = await signIn("credentials", { email, password });

    // if(!isValidLogin) {
    //   setShowError(true);
    // }
  }

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
                sx={{border: "1px solid #4caf50", "&:hover": {backgroundColor: "#4caf50", color: "white"}}}
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
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};


export default LoginPage;
