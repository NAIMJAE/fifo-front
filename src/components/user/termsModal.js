import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../../styles/user/register.scss";

const style = {
  position: "absolute",
  //borderRadius: "10px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "60%",
  whiteSpace: "pre-line",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  scrollbars: "",
};

export default function BasicModal({
  termsModalClose,
  openTerms,
  handlerModal,
  terms,
  privacy,
}) {
  return (
    <div>
      <Modal open={openTerms} onClose={termsModalClose} className="termsModal">
        <Box sx={style}>
          <Typography
            style={{ display: "flex", justifyContent: "center" }}
            id="modal-modal-title"
            variant="h3"
            component="h2"
          >
            {handlerModal === "terms" ? "이용약관" : "개인정보 처리방침"}
          </Typography>
          <Typography
            style={{
              border: "1px solid #111",
              padding: "10px",
            }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {handlerModal === "terms" ? terms : privacy}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
