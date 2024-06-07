import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  isSuccess: boolean | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  isSuccess,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 1,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">
            {isSuccess === true
              ? "商品の登録に成功しました"
              : "商品の登録に失敗しました"}
          </Typography>
          <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
            閉じる
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
