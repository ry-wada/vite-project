import React from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import UserFooter from "../common/Footer";
import { UserHeader } from "../common/Header";
import { BodyText, HeaderSpace } from "../../styles";
import { useAuth } from "../../contexts/AuthContext";

const MyPage: React.FC = () => {
  const { user } = useAuth(); // ユーザー情報を取得

  return (
    <>
      <UserHeader />
      <HeaderSpace />
      <Container>
        <BodyText>マイページ</BodyText>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                {user ? (
                  <>
                    <Typography variant="h5" gutterBottom align="center">
                      名前:
                    </Typography>
                    <Typography variant="body1" align="center">
                      山田花子{/* DBにないのでとりあえず */}
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
                      {user.email} {/* メールアドレスを表示 */}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" gutterBottom align="center">
                      ログインしてください。
                    </Typography>
                  </>
                )}
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
