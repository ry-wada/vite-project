import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton"; // IconButton を追加
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // ショッピングカートのアイコンを追加
import Badge from "@mui/material/Badge"; // バッジを追加
import { Button } from "@mui/material";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  //   const [cartItemCount, setCartItemCount] = useState<number>(0); // カートのアイテム数
  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/myCartPage");
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null); // ログアウト後、ポップアップを閉じる
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // カートアイテムの数を設定する関数
  //   const setCartItemsCount = (count: number) => {
  //     setCartItemCount(count);
  //   };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          LH-EC-SHOP
        </Typography>
        <div>
          {/* IconButton を使用し、onClick プロパティを直接設定 */}
          <IconButton color="inherit" onClick={handleCart}>
            {/* マイカートアイコンにバッジを追加 とりあえず2*/}
            <Badge badgeContent={2} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button onClick={handleClick} color="inherit">
            Info
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {isLoggedIn ? (
              <>
                <MenuItem component={Link} to="/myPage" onClick={handleClose}>
                  マイページ
                </MenuItem>
                <MenuItem component={Link} to="/" onClick={handleLogout}>
                  ログアウト
                </MenuItem>
              </>
            ) : (
              <MenuItem component={Link} to="/loginPage" onClick={handleClose}>
                ログイン
              </MenuItem>
            )}
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
