import { useState, useContext } from "react";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import axios from "axios";
import { validations } from "@/utils";
import { CancelOutlined } from "@mui/icons-material";
import { UiContext } from "@/context";

type FormData = {
  email: string;
};

export const ModalSubscribe = () => {
  const { isModalOpen, toggleModalOpen } = useContext(UiContext);

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
      const response = await axios.post("/api/mailchimp/subscribe", { email });
      console.log(response);
      setState("Success");
      setMessage("Fabuloso, has sido suscripto!");
      setEmail("");
      setTimeout(() => {
        setState("idle");
        toggleModalOpen();
      }, 2000);
    } catch (error) {
      console.log(error);
      setState("Error");
      setMessage("Algo salío mal");
      setTimeout(() => {
        setState("idle");
      }, 2000);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={toggleModalOpen}>
      <form onSubmit={handleSubmit(onSubscribe)} noValidate>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            Ptransform: "translate(-50%, -50%)",
            width: { xs: 300, sm: 400 },
            bgcolor: "#ffff",
            border: "5px solid #008f39",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
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
              value={email}
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
                backgroundColor: "#008f39",
                color: "white",
                height: "55px",
                border: "1px solid white",
                //   width: { xs: "100%", sm: "60%" },
                "&:hover": {
                  backgroundColor: "white",
                  color: "#008f39",
                  border: "2px solid #008f39",
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
