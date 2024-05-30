// components/Footer.tsx
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const Footer: React.FC = () => {
  return (
    <Toolbar
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgba(0, 0, 0, 0.1)", // オプション: フッターの背景色を設定
        borderTop: "1px solid #ccc", // 上枠を追加
        padding: "10px 20px", // オプション: 上下左右の余白を追加
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
  );
};

export default Footer;
