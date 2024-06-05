import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, CardContent, Typography } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import {
  ProductListHeading,
  ProductCardContainer,
  LoadMoreButton,
  HeaderSpace,
  BodyText,
  ProductImage,
} from "../../styles";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { 初期表示数 } from "../common/constants";

const UserHome: React.FC = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/items?limit=${初期表示数}&page=${page}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts, page]);

  const showMoreProducts = async () => {
    try {
      const nextPage = page + 1;
      const response = await fetch(
        `http://localhost:8080/api/items?limit=${初期表示数}&page=${nextPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more products");
      }
      const data = await response.json();
      setProducts([...products, ...data.data]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <BodyText variant="h4">LH-EC-SHOPへようこそ！！</BodyText>
      <ProductListHeading variant="body1">商品一覧</ProductListHeading>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Link
              to={`/productDetail/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <ProductCardContainer>
                <ProductImage
                  src={`src/picture/image${product.id}.jpg`}
                  alt={product.name}
                />
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    価格: {product.price} 円
                  </Typography>
                </CardContent>
              </ProductCardContainer>
            </Link>
          </Grid>
        ))}
      </Grid>
      <LoadMoreButton variant="contained" onClick={showMoreProducts}>
        もっと表示
      </LoadMoreButton>
      <UserFooter />
    </>
  );
};

export default UserHome;
