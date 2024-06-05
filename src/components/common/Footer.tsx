import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const UserFooter: React.FC = () => {
  return (
    <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(0, 191, 255, 0.5)",
          borderTop: "1px solid #ccc",
          padding: "10px 20px",
        }}
      >
        <div>
          <Button href="https://www.littleheroes.jp/w/about" color="inherit">
            会社情報
          </Button>
          <Button href="https://www.littleheroes.jp/w/about/lh" color="inherit">
            LHについて
          </Button>
          <Button href="https://www.littleheroes.jp/w/terms" color="inherit">
            利用規約
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default UserFooter;
