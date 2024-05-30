// ProductPage.tsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Typography, CardContent, Grid, Button } from "@mui/material";
import { ProductContext } from "../contexts/ProductContext";
import Header from "./Header";
import Footer from "./Footer";
import { ProductCardContainer, ProductImage } from "../styles";

const ProductPage: React.FC = () => {
  const { id = "" } = useParams<{ id?: string }>();
  const { products } = useContext(ProductContext);
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <>
        <Header />
        <Typography variant="h6">Product not found</Typography>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
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
            {/* addToCartButtonスタイルを適用したButtonコンポーネント */}
            <Button variant="contained" color="primary">
              カートに追加
            </Button>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default ProductPage;
