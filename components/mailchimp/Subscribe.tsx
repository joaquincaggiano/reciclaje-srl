import { useState } from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { validations } from "@/utils";

type FormData = {
  email: string;
};

export const Subscribe = () => {
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<string>("idle");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubscribe = async () => {
    setState("Loading");

    try {
      const response = await axios.post("/api/subscribe", { email });
      console.log(response);
      setState("Success");
      setEmail("");
      setMessage("Fabuloso, has sido suscripto!");
      setTimeout(() => {setState("idle")}, 2000)
    } catch (error) {
      console.log(error);
      setState("Error");
      setMessage("Algo salío mal");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubscribe)} noValidate>
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", color: "white" }}>
          Subscribirse a las Novedades
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "center", fontSize: "20px", color: "white" }}
        >
          Notificate sobre todas nuestras novedades de negocios
        </Typography>

        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          flexWrap="wrap"
          sx={{
            flexDirection: { xs: "column" },
            width: "90%",
            margin: "auto",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <TextField
              type="email"
              label="Correo"
              variant="filled"
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                my: { xs: 2 },
                mr: { sm: 2 },
              }}
              fullWidth
              {...register("email", {
                required: "Este campo es requerido",
                validate: validations.isEmail,
              })}
              error={!!errors.email} //el !! hace que sea un valor booleano
              helperText={errors.email?.message}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              disabled={state === "Loading"}
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "white",
                color: "#008f39",
                height: "55px",
                border: "1px solid #008f39",
                width: { xs: "100%", sm: "60%" },
                "&:hover": { backgroundColor: "#008f39", color: "white", border: "1px solid white", },
              }}
            >
              Suscribirse
            </Button>
          </Box>

          {state === "Error" && (
            <Chip
              label={message}
              color="error"
              variant="outlined"
              sx={{
                backgroundColor: "#ffff",
                width: "80%",
                mt: 1,
                border: "2px solid",
              }}
            />
          )}
          {state === "Success" && (
            <Chip
              label={message}
              color="secondary"
              variant="outlined"
              sx={{
                backgroundColor: "#ffff",
                width: "80%",
                mb: 1,
              }}
            />
          )}
        </Box>
      </Box>
    </form>
  );
};
