import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, CardContent } from "@mui/material";
import { ProductContext } from "../../contexts/ProductContext";
import { ProductCardContainer } from "../../styles";
import { AdminHeader } from "../common/Header";
import { CustomButton, CustomTypography } from "../../features/components";
import { useProducts } from "../../lib/hooks";

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const { setProducts } = useContext(ProductContext);
  const { products, showMoreProducts } = useProducts();
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    // ログインしていない場合は /admin にリダイレクト
    if (!auth) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  // カスタムフックの中で products が更新されるたびに、ProductContext の products を更新
  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return (
    <>
      <AdminHeader />
      <div style={{ marginTop: "64px", textAlign: "center", marginBottom: 20 }}>
        <CustomTypography variant="h4" text="商品一覧" />
        <Grid container justifyContent="flex-end" style={{ marginBottom: 20 }}>
          <Grid item>
            <Link to="/adminAddProduct" style={{ textDecoration: "none" }}>
              <CustomButton label="商品新規登録" />
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
                    <CustomTypography variant="h6" text={product.name} />
                    <CustomTypography
                      variant="subtitle1"
                      text={`価格: ${product.price} 円`}
                    />
                    <CustomTypography variant="body2" text={product.content} />
                  </CardContent>
                </ProductCardContainer>
              </Link>
            </Grid>
          ))}
        </Grid>
        <CustomButton onClick={showMoreProducts} label="もっと表示" />
      </div>
    </>
  );
};

export default AdminHome;
