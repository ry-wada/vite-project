import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { Product } from "../../contexts/ProductContext";
import { APIパス } from "../common/constants";
import { useAuth } from "../../contexts/AuthContext"; // AuthContextをインポート

// 商品編集モーダル
interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  productData: Product; // 商品データ
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  productData,
}) => {
  const { token } = useAuth(); // トークンを取得
  const [editedProductData, setEditedProductData] = useState(productData);
  const [updateSuccess, setUpdateSuccess] = useState(false); // 更新成功のフラグ

  // 保存処理
  const handleSave = async () => {
    try {
      const updatedProductData = {
        name: editedProductData.name,
        price: editedProductData.price,
        content: editedProductData.content,
      };

      console.log("updatedProductData", updatedProductData);

      const response = await fetch(`${APIパス}/items/${productData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`, // トークンを追加
        },
        body: JSON.stringify(updatedProductData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      setUpdateSuccess(true); // 更新成功のフラグをtrueに設定
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // フォームの入力値を更新する関数
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProductData({
      ...editedProductData,
      [name]: value,
    });
  };

  // モーダルを閉じるときに updateSuccess をリセット
  const handleClose = () => {
    setUpdateSuccess(false);
    onClose();
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
          {updateSuccess ? "商品情報の更新が成功しました" : "商品を編集"}
        </Typography>
        {!updateSuccess && (
          <>
            <TextField
              fullWidth
              label="商品名"
              name="name"
              defaultValue={editedProductData.name}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="価格"
              name="price"
              type="number"
              defaultValue={editedProductData.price}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="説明"
              name="content"
              defaultValue={editedProductData.content}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {!updateSuccess ? (
            <>
              <Button variant="contained" onClick={handleSave}>
                保存
              </Button>
              <Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
                キャンセル
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleClose}>
              閉じる
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
