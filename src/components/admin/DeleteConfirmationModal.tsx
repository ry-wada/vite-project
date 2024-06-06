import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { APIパス } from "../common/constants";
import { useAuth } from "../../contexts/AuthContext"; // AuthContextをインポート

// 削除確認モーダル
interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  productId: string; // 削除する商品のID
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  productId,
}) => {
  const { token } = useAuth(); // トークンを取得
  const [deleted, setDeleted] = useState(false);

  // 削除処理
  const handleDelete = async () => {
    try {
      const response = await fetch(`${APIパス}/items/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`, // トークンを追加
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setDeleted(true);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // モーダルを閉じる処理
  const handleClose = () => {
    if (deleted) {
      onClose();
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
            // とりあえず閉じるだけ
            <Button variant="contained" color="error" onClick={handleClose}>
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

export default DeleteConfirmationModal;
