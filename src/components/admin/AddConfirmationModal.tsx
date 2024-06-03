import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

//新規登録成功時のモーダル
interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const AddConfimationModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          商品の登録に成功しました
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" onClick={onClose}>
            閉じる
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddConfimationModal;
