import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CardContent, Grid, Button } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import { ProductCardContainer, ProductImage } from "../../styles";
import { AdminHeader } from "../common/Header";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditProductModal from "./EditProductModal"; // 商品編集モーダルをインポート

const ProductDetail: React.FC = () => {
  const { id = "" } = useParams<{ id?: string }>();
  const { products } = useContext(ProductContext);
  const product = products.find((p) => p.id === parseInt(id, 10));

  const [openDeleteModal, setOpenDeleteModal] = useState(false); // 削除モーダルの開閉状態
  const [openEditModal, setOpenEditModal] = useState(false); // 編集モーダルの開閉状態

  // 削除モーダルを開く関数
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  // 削除モーダルを閉じる関数
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  // 編集モーダルを開く関数
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  // 編集モーダルを閉じる関数
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  if (!product) {
    return (
      <>
        <AdminHeader />
        <Typography variant="h6">Product not found</Typography>
      </>
    );
  }

  // 商品削除処理
  const handleDelete = () => {
    // deleteProduct(product.id);
    handleCloseDeleteModal();
  };

  // 商品編集処理
  const handleEdit = () => {
    // 商品編集ページへ遷移する処理
  };

  return (
    <>
      <AdminHeader />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ProductCardContainer style={{ margin: "20px" }}>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h4" component="h1">
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                価格: {product.price.toFixed(2)} 円
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ margin: "20px" }}
              >
                {product.description}
              </Typography>
            </CardContent>
          </ProductCardContainer>
          <div style={{ textAlign: "right", margin: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={handleOpenEditModal}
            >
              編集する
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDeleteModal}
            >
              削除する
            </Button>
          </div>
        </Grid>
      </Grid>

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />

      <EditProductModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        onSave={handleEdit} // 保存ボタンがクリックされた時の処理を指定する
        productData={product} // 編集モーダルに表示する商品データを渡す
      />
    </>
  );
};

export default ProductDetail;
