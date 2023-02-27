import { useState, useContext } from 'react';
import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { validations } from "@/utils";
import { CancelOutlined } from "@mui/icons-material";
import { UiContext } from '@/context';

type FormData = {
  email: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffff",
  border: "5px solid #4caf50",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export const ModalSubscribe = () => {
  const {isModalOpen, toggleModalOpen} = useContext(UiContext)

  // const [open, setOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<string>("idle");
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // const handleClose = () => setOpen(false);

  const onSubscribe = async () => {
    setState("Loading");

    try {
      const response = await axios.post("/api/subscribe", { email });
      console.log(response);
      setState("Success");
      setEmail("");
      setMessage("Fabuloso, has sido suscripto!");
      setTimeout(() => {
        setState("idle");
      }, 2000);
    } catch (error) {
      console.log(error);
      setState("Error");
      setMessage("Algo salío mal");
    }
  };

  return (
    <Modal open={isModalOpen} onClose={toggleModalOpen}>
      <form onSubmit={handleSubmit(onSubscribe)} noValidate>
        <Box sx={style}>
          <CancelOutlined
            sx={{
              position: "relative",
              left: "90%",
              cursor: "pointer",
              fontSize: "25px",
              "&:hover": { color: "#d32f2f" },
            }}
            onClick={toggleModalOpen}
          />

          <Typography variant="h4" component="h2">
            Suscríbete a nuestras novedades!
          </Typography>

          <Box
            display="flex"
            //   justifyContent="space-evenly"
            //   alignItems="center"
            flexDirection="column"
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
                backgroundColor: "#4caf50",
                color: "white",
                height: "55px",
                border: "1px solid white",
                //   width: { xs: "100%", sm: "60%" },
                "&:hover": {
                  backgroundColor: "white",
                  color: "#4caf50",
                  border: "2px solid #4caf50",
                },
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
                width: "100%",
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
                width: "100%",
                mt: 1,
                border: "2px solid",
              }}
            />
          )}
        </Box>
      </form>
    </Modal>
  );
};
