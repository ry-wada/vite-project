import React from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CardMedia,
} from "@mui/material";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";

// カートアイテムの型定義
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const MyCart: React.FC = () => {
  // 仮のカートアイテムデータ
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Product A",
      price: 10,
      image: "path/to/productA.jpg",
    },
    {
      id: 2,
      name: "Product B",
      price: 20,
      image: "path/to/productB.jpg",
    },
  ];

  // カート内アイテムの合計金額を計算する関数
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // 商品をカートから削除する関数
  const removeFromCart = (id: number) => {
    // 削除のロジックを追加
    console.log(`Removing item with id ${id} from cart`);
  };

  return (
    <>
      <UserHeader />
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          カート一覧
        </Typography>
        <Grid container justifyContent="flex-end" style={{ marginTop: "20px" }}>
          <Typography variant="h6">
            合計金額: {calculateTotalPrice()}円
          </Typography>
        </Grid>
        {cartItems.map((item) => (
          <Card key={item.id} style={{ marginBottom: "20px" }}>
            <CardContent>
              <Grid container>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    height="140"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body1">金額: {item.price}円</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "auto" }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    削除する
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Container>
      <UserFooter />
    </>
  );
};

export default MyCart;
