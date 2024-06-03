// MyPage.tsx

import React from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";

const MyPage: React.FC = () => {
  // 仮のユーザーデータ
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <>
      <UserHeader />
      <Container>
        <Typography
          variant="h5"
          align="center"
          style={{ marginTop: "20px" }}
          gutterBottom
        >
          マイページ
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                  名前:
                </Typography>
                <Typography variant="body1" align="center">
                  {user.name}
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="center"
                  style={{ marginTop: "20px" }}
                >
                  メールアドレス:
                </Typography>
                <Typography variant="body1" align="center">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <UserFooter />
    </>
  );
};

export default MyPage;