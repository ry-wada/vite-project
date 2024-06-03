import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

// 商品編集モーダル
interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (productData: any) => void;
  productData: any; // 商品データ
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  onSave,
  productData,
}) => {
  const [editedProductData, setEditedProductData] = useState(productData);
  const [updateSuccess, setUpdateSuccess] = useState(false); // 更新成功のフラグ

  // 保存処理
  const handleSave = () => {
    onSave(editedProductData);
    setUpdateSuccess(true); // 更新成功のフラグをtrueに設定
    onClose();
  };

  // フォームの入力値を更新する関数
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProductData({
      ...editedProductData,
      [name]: value,
    });
  };

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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {updateSuccess ? "商品情報の更新が成功しました" : "商品を編集"}
        </Typography>
        {!updateSuccess && (
          <>
            <TextField
              fullWidth
              label="商品名"
              name="name"
              value={editedProductData.name}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="価格"
              name="price"
              type="number"
              value={editedProductData.price}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="説明"
              name="description"
              value={editedProductData.description}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            保存
          </Button>
          <Button variant="contained" onClick={onClose} sx={{ ml: 2 }}>
            キャンセル
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
