import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext"; // AuthContextをインポート
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../features/api";

// 削除確認モーダル
interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  productId: number;
}

const DeleteProductModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  productId,
}) => {
  const { token } = useAuth(); // トークンを取得
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  // 削除処理
  const handleDelete = async () => {
    const success = await deleteProduct(productId, token);
    setDeleted(success); // 削除成功のフラグを設定
  };

  // モーダルを閉じる処理
  const handleClose = () => {
    if (deleted) {
      onClose();
      navigate("/adminHome");
    } else {
      setDeleted(false);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {deleted ? "削除に成功しました" : "商品を削除しますか？"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {!deleted && (
            <Button variant="contained" color="error" onClick={handleDelete}>
              削除する
            </Button>
          )}
          <Button variant="contained" onClick={handleClose}>
            {deleted ? "閉じる" : "キャンセル"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
