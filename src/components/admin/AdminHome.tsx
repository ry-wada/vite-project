import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, CardContent, Typography } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import { LoadMoreButton, ProductCardContainer } from "../../styles";
import { AdminHeader } from "../common/Header";
import { APIパス, 初期表示数, 追加表示数 } from "../common/constants";

const AdminHome: React.FC = () => {
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
      const response = await fetch(
        `${APIパス}/items?limit=${追加表示数}&page=${nextPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch more products");
      }
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.data]);
      setPage(nextPage);
      setVisibleProducts((prevCount) => prevCount + 追加表示数);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div style={{ marginTop: "64px", textAlign: "center", marginBottom: 20 }}>
        <Typography marginTop="100px" variant="h4">
          商品一覧
        </Typography>
        <Grid container justifyContent="flex-end" style={{ marginBottom: 20 }}>
          <Grid item>
            <Link to="/adminAddProduct" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                商品新規登録
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          {products.slice(0, visibleProducts).map((product) => (
            <Grid item key={product.id} xs={12} style={{ marginBottom: 20 }}>
              <Link
                to={`/adminProductDetail/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProductCardContainer>
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.content}
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

export default AdminHome;
