import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, CardContent, Grid, Button } from "@mui/material";
import { HeaderSpace, ProductCardContainer, ProductImage } from "../../styles";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { CartContext } from "../../contexts/CartContext";
import { Product } from "../../contexts/ProductContext";
import { fetchProductDetail } from "../../features/api";
import { IMAGEパス } from "../../lib/config";

const ProductDetail: React.FC = () => {
  const { id = "" } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);

  //useeffectいるか調査
  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const initialProducts = await fetchProductDetail(id);
        setProduct(initialProducts);
      } catch (error) {
        console.error("Error loading initial products:", error);
      }
    };
    loadInitialProducts();
  }, [id, setProduct]);

  if (!product) {
    return (
      <>
        <UserHeader />
        <Typography variant="h6">商品が見つかりませんでした...</Typography>
        <UserFooter />
      </>
    );
  }

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <ProductCardContainer style={{ margin: "20px" }}>
            <CardContent style={{ textAlign: "center" }}>
              <ProductImage
                src={`${IMAGEパス}${product.id}.jpg`}
                alt={product.name}
              />
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
              onClick={() => addToCart(product)}
            >
              カートに追加
            </Button>
          </div>
        </Grid>
      </Grid>
      <UserFooter />
    </>
  );
};

export default ProductDetail;
