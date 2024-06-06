import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, CardContent, Typography, Container } from "@mui/material";
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
import {
  APIパス,
  IMAGEパス,
  初期表示数,
  追加表示数,
} from "../common/constants";

const UserHome: React.FC = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [visibleProducts, setVisibleProducts] = useState(初期表示数);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${APIパス}/items?limit=${初期表示数}&page=1`
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
  }, [setProducts]);

  const showMoreProducts = async () => {
    try {
      const nextPage = page + 1;
      const moreProducts = 初期表示数 + 追加表示数 * nextPage;
      const response = await fetch(
        `${APIパス}/items?limit=${moreProducts}&page=${nextPage}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more products");
      }
      const data = await response.json();
      setProducts([...products, ...data.data]);
      setPage(nextPage);
      setVisibleProducts((prevCount) => prevCount + 追加表示数);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Container style={{ marginBottom: "120px" }}>
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
                    src={`${IMAGEパス}${product.id}.jpg`}
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
        {visibleProducts < products.length && (
          <LoadMoreButton variant="contained" onClick={showMoreProducts}>
            もっと表示
          </LoadMoreButton>
        )}
      </Container>
      <UserFooter />
    </>
  );
};

export default UserHome;
