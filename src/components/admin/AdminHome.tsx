import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, CardContent, Typography } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import { LoadMoreButton, ProductCardContainer } from "../../styles";
import { AdminHeader } from "../common/Header";
import { fetchProducts } from "../../features/api";
import { 初期表示数, 追加表示数 } from "../../lib/constants";

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const [page, setPage] = useState(1);

  const auth = localStorage.getItem("auth");

  useEffect(() => {
    // ログインしていない場合は/adminにリダイレクト
    if (!auth) {
      navigate("/admin");
    }

    const loadInitialProducts = async () => {
      try {
        const initialProducts = await fetchProducts(初期表示数, 1);
        setProducts(initialProducts);
      } catch (error) {
        console.error("Error fetching initial products:", error);
      }
    };
    loadInitialProducts();
  }, [setProducts, auth, navigate]);

  const showMoreProducts = async () => {
    try {
      const nextPage = page + 1;
      const moreProducts = await fetchProducts(追加表示数, nextPage);
      setProducts((prevProducts) => [...prevProducts, ...moreProducts]);
      setPage(nextPage);
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
          {products.map((product) => (
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
        <LoadMoreButton variant="contained" onClick={showMoreProducts}>
          もっと表示
        </LoadMoreButton>
      </div>
    </>
  );
};

export default AdminHome;
