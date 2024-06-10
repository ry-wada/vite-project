import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, CardContent, Grid, Button } from "@mui/material";
import { Product } from "../../contexts/ProductContext";
import { HeaderSpace, ProductCardContainer } from "../../styles";
import { AdminHeader } from "../common/Header";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { fetchProductDetail } from "../../features/api";

const AdminProductDetail: React.FC = () => {
  const { id = "" } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // 削除モーダルの開閉状態
  const [openEditModal, setOpenEditModal] = useState(false); // 編集モーダルの開閉状態
  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();

  // 商品詳細を取得する関数
  const loadProductDetail = useCallback(async () => {
    try {
      const data = await fetchProductDetail(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, [id]);

  useEffect(() => {
    // ログインしていない場合は/adminにリダイレクト
    if (!auth) {
      navigate("/admin");
    }
    loadProductDetail();
  }, [id, auth, navigate, loadProductDetail]);

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
        <Typography variant="h6">商品が見つかりませんでした...</Typography>
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <HeaderSpace />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ProductCardContainer style={{ margin: "20px" }}>
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h4" component="h1">
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                価格: {product.price} 円
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ margin: "20px" }}
              >
                {product.content}
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

      <DeleteProductModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        productId={product.id} // 削除モーダルに表示する商品データを渡す
      />

      <EditProductModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        onUpdated={loadProductDetail} // 編集モーダルが閉じた後にデータを再取得
        productData={product} // 編集モーダルに表示する商品データを渡す
      />
    </>
  );
};

export default AdminProductDetail;
