"use client";

import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { useThemeContext } from "@/app/Provider";
import Link from "next/link";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
  const { darkMode, setDarkMode } = useThemeContext();

  return (
    <AppBar position="sticky" color="warning">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href={'/products'}>My Store</Link>
        </Typography>
        <IconButton>
          <Link href={'/cart'}><ShoppingCartIcon /></Link>
        </IconButton>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </Toolbar>
    </AppBar>
  );
}
