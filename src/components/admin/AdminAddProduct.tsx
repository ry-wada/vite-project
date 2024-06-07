import React, { useEffect, useState } from "react";
import { Button, Typography, Grid, TextField } from "@mui/material";
import { AdminHeader } from "../common/Header";
import { APIパス } from "../common/constants";
import { useAuth } from "../../contexts/AuthContext";
import AddProductModal from "./AddProductModal";
import { useNavigate } from "react-router-dom";

const AdminAddProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false); // 成功モーダルの表示状態
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // API通信の結果を保存する状態
  const [error, setError] = useState(""); // エラーメッセージの状態
  const { token } = useAuth();
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");

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

  useEffect(() => {
    // ログインしていない場合は/adminにリダイレクト
    if (!auth) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  // 商品新規登録ボタンがクリックされたときの処理
  const handleSave = async () => {
    // 全ての項目が入力されているかをチェック
    if (!productName || !price || !description) {
      setError("全ての項目を入力してください");
      return;
    }

    try {
      const response = await fetch(`${APIパス}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`, // トークンを追加
        },
        body: JSON.stringify({
          name: productName,
          price: Number(price),
          content: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      console.log("商品が保存されました:", response);
      setIsSuccess(true); // 成功を設定
      setSuccessModalOpen(true); // 成功モーダルを表示する

      // フォームのリセット
      setProductName("");
      setPrice("");
      setDescription("");
      setError(""); // エラーメッセージをクリア
    } catch (error) {
      console.error("Error saving product:", error);
      setIsSuccess(false); // 失敗を設定
      setSuccessModalOpen(true); // 失敗モーダルを表示する
    }
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
            {error && <Typography color="error">{error}</Typography>}
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
        <AddProductModal
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          isSuccess={isSuccess} // 成功か失敗かの状態を渡す
        />
      </div>
    </>
  );
};

export default AdminAddProduct;
