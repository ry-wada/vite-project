import React, { useState } from "react";
import { Button, Typography, Grid, TextField } from "@mui/material";
import { AdminHeader } from "../common/Header";
import AddConfimationModal from "./AddConfirmationModal";

const AdminAddProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false); // 成功モーダルの表示状態

  // 商品名の入力値が変更されたときの処理
  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductName(event.target.value);
  };

  // 金額の入力値が変更されたときの処理
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  // 説明の入力値が変更されたときの処理
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  // 商品新規登録ボタンがクリックされたときの処理
  const handleSave = () => {
    // 保存処理を実行する
    console.log("商品が保存されました:", productName, price, description);
    // 成功モーダルを表示する
    setSuccessModalOpen(true);
  };

  return (
    <>
      <AdminHeader />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Typography variant="h4">商品新規登録</Typography>
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              fullWidth
              label="商品名"
              value={productName}
              onChange={handleProductNameChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="金額"
              value={price}
              onChange={handlePriceChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="説明"
              value={description}
              onChange={handleDescriptionChange}
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              style={{ marginTop: 20 }}
            >
              商品新規登録
            </Button>
          </Grid>
        </Grid>
        {/* 成功モーダル */}
        <AddConfimationModal
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
        />
      </div>
    </>
  );
};

export default AdminAddProduct;
