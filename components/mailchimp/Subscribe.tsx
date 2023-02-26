import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { validations } from "@/utils";

type FormData = {
  email: string;
};

export const Subscribe = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubscribe = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/subscribe", { email });
      console.log(response);
      setIsLoading(true);
      setEmail("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubscribe)} noValidate>
      <Box>
        <Typography variant="h4">Subscribirse a las Novedades</Typography>
        <Typography variant="body1">
          Notificate sobre todas nuestras novedades de negocios
        </Typography>

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

        <Button
          disabled={isLoading === true}
          type="submit"
          color="secondary"
          className="circular-btn"
          size="large"
          fullWidth
          sx={{
            border: "1px solid #4caf50",
            "&:hover": { backgroundColor: "#4caf50", color: "white" },
          }}
        >
          Suscribirse
        </Button>
      </Box>
    </form>
  );
};
