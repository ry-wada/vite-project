import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { Product } from "../../contexts/ProductContext";
import { useAuth } from "../../contexts/AuthContext";
import { updateProduct } from "../../features/api";

// 商品編集モーダル
interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void; // データ更新後に呼び出されるコールバック関数
  productData: Product; // 商品データ
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  onUpdated,
  productData,
}) => {
  const { token } = useAuth(); // トークンを取得
  const [editedProductData, setEditedProductData] = useState(productData);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null); // 更新成功のフラグ

  // 保存処理
  const handleSave = async () => {
    const success = await updateProduct(editedProductData, token);
    setUpdateSuccess(success); // 更新成功のフラグを設定
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
    setUpdateSuccess(null);
    onUpdated(); // データ更新後にコールバックを呼び出す
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
          {updateSuccess === true && "商品情報の更新が成功しました"}
          {updateSuccess === false && "商品情報の更新が失敗しました"}
          {updateSuccess === null && "商品を編集"}
        </Typography>
        {updateSuccess === null && (
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
          {updateSuccess === null ? (
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
