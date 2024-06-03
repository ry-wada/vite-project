import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, CardContent, Typography } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import {
  LoadMoreButton,
  ProductCardContainer,
  ProductImage,
} from "../../styles";
import { AdminHeader } from "../common/Header";

const AdminHome: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [visibleProducts, setVisibleProducts] = useState(
    InitialVisibleProducts
  );

  // もっと表示ボタンがクリックされたときに表示する商品数を増やす関数
  const showMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + IncrementValue);
  };

  return (
    <>
      <AdminHeader />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Typography variant="h4">商品一覧</Typography>
        <Grid container justifyContent="flex-end" style={{ marginBottom: 20 }}>
          <Grid item>
            <Link to="/adminAddProduct" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                商品新規登録
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          {products.slice(0, visibleProducts).map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Link
                to={`/adminProductDetail/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductCardContainer>
                  <ProductImage src={product.imageUrl} alt={product.name} />
                  <CardContent style={{ textAlign: "center" }}>
                    <Typography variant="h6" component="h2">
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
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </ProductCardContainer>
              </Link>
            </Grid>
          ))}
        </Grid>
        {visibleProducts < products.length && (
          <LoadMoreButton variant="contained" onClick={showMoreProducts}>
            もっと表示
          </LoadMoreButton>
        )}
      </div>
    </>
  );
};

// 初期表示数と増加値を定数として定義する
const InitialVisibleProducts = 6;
const IncrementValue = 6;

export default AdminHome;
