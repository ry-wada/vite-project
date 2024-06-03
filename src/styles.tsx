/* eslint-disable react-refresh/only-export-components */
import { styled } from "@mui/system";
import { Card, Typography, Button } from "@mui/material";

export const ProductCardContainer = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const ProductImage = styled("img")({
  width: "100%",
  maxHeight: 100,
  objectFit: "cover",
});

export const WelcomeText = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(4),
}));

export const ProductListHeading = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(4),
  textAlign: "left",
}));

export const LoadMoreButton = styled(Button)({
  margin: "20px 0",
});

export const ProductCard = styled(Card)({
  maxWidth: 400,
  margin: "auto",
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const addToCartButton = styled(Button)({
  margin: "20px",
  textAlign: "right",
});
