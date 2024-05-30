import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, CardContent, Typography } from "@mui/material";
import { ProductContext } from "../contexts/ProductContext";
import Header from "./Header";
import Footer from "./Footer";
import {
  WelcomeText,
  ProductListHeading,
  ProductCardContainer,
  ProductImage,
  LoadMoreButton,
} from "../styles";

const HomePage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [visibleProducts, setVisibleProducts] = useState(
    InitialVisibleProducts
  );

  const showMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + IncrementValue);
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <WelcomeText variant="h4">LH-EC-SHOPへようこそ！！</WelcomeText>
        <ProductListHeading variant="body1">商品一覧</ProductListHeading>
        <Grid container spacing={2} justifyContent="center">
          {products.slice(0, visibleProducts).map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Link
                to={`/productPage/${product.id}`}
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
      <Footer />
    </>
  );
};

// 初期表示数と増加値を定数として定義する
const InitialVisibleProducts = 6;
const IncrementValue = 6;

export default HomePage;
