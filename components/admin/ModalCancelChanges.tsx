import { useState, useContext } from 'react';
import { Box, Button, Chip, Modal, TextField, Typography } from "@mui/material";
import { UiContext } from '@/context';
import { CancelOutlined } from '@mui/icons-material';

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

export const ModalCancelChanges = () => {
  const {isModalCancelChange, toggleModalCancelChange} = useContext(UiContext)

  // const [open, setOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<string>("idle");
  const [message, setMessage] = useState<string>("");

  const onSubscribe = async () => {
    setState("Loading");

    try {

    } catch (error) {
      console.log(error);
      setState("Error");
      setMessage("Algo salío mal");
    }
  };

  return (
    <>
    <Modal open={isModalCancelChange} onClose={toggleModalCancelChange}>
 <Box sx={style}>
          <CancelOutlined
            sx={{
              position: "relative",
              left: "90%",
              cursor: "pointer",
              fontSize: "25px",
              "&:hover": { color: "#d32f2f" },
            }}
            onClick={toggleModalCancelChange}
          />
          <Typography variant="h4" component="h2">
            Please save changes before leaving this page! 
            You can also discard your changes by pressing the Discard changes button
          </Typography>

          <Button>
            Discard changes
          </Button>
          <Button>
            Stay in this page
            </Button>         
</Box>
    </Modal>
    </>
  );
};
