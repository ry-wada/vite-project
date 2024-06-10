import React, { useContext } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { CartContext } from "../../contexts/CartContext";
import { BodyText, HeaderSpace, ProductImage } from "../../styles";
import { IMAGEパス } from "../../lib/config";

const MyCart: React.FC = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // カート内アイテムの合計金額を計算する関数
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Container style={{ marginBottom: "120px" }}>
        <BodyText>カート一覧</BodyText>
        {cartItems.length === 0 ? (
          <Typography variant="h5" gutterBottom align="center">
            カートに商品がありません。
          </Typography>
        ) : (
          <>
            <Grid
              container
              justifyContent="flex-end"
              style={{ marginTop: "20px" }}
            >
              <Typography variant="h6">
                合計金額: {calculateTotalPrice()}円
              </Typography>
            </Grid>
            {cartItems.map((item, index) => (
              <Card key={index} style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <ProductImage
                        src={`${IMAGEパス}${item.id}.jpg`}
                        alt={item.name}
                      />
                      <Typography variant="h5" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body1">
                        金額: {item.price}円
                      </Typography>
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        削除する
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Container>
      <UserFooter />
    </>
  );
};

export default MyCart;
