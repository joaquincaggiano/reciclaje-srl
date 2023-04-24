import { useContext, FC } from "react";
import Button from "@mui/material/Button";
import Modal  from "@mui/material/Modal";
import  Box from "@mui/material/Box";
import Typography  from "@mui/material/Typography";
import { UiContext } from "@/context";
import CancelOutlined from "@mui/icons-material/CancelOutlined";

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

interface Props {
  deleteUnsavedChanges: () => Promise<void>;
}

export const ModalCancelChanges: FC<Props> = ({deleteUnsavedChanges}) => {
  const { isModalCancelChange, toggleModalCancelChange } =
    useContext(UiContext);

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

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h4" component="h2">
              Please save changes before leaving this page!
            </Typography>

            <Typography variant="body1">
              You can also discard your changes by pressing the Discard changes
              button
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button
              onClick={() => deleteUnsavedChanges()}
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                height: "55px",
                border: "1px solid white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#4caf50",
                  border: "2px solid #4caf50",
                },
              }}
            >
              Descartar cambios
            </Button>

            <Button
              onClick={toggleModalCancelChange}
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                height: "55px",
                border: "1px solid white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#4caf50",
                  border: "2px solid #4caf50",
                },
              }}
            >
              Mantenerse en la página
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
