import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext"; // AuthContextをインポート
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../features/api";
import { BoxContainer } from "../../styles";
import { CustomButton } from "../../features/components";

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
      <Box sx={BoxContainer}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {deleted ? "削除に成功しました" : "商品を削除しますか？"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {!deleted && (
            <CustomButton
              color="error"
              onClick={handleDelete}
              label="削除する"
            ></CustomButton>
          )}
          <CustomButton
            onClick={handleClose}
            label={deleted ? "閉じる" : "キャンセル"}
          ></CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
