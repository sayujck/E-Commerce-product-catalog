"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails } from "@/app/lib/api";
import { Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { cartAtom } from "@/app/store/cartAtom";
import React from "react";
import Link from "next/link";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [cart, setCart] = useAtom(cartAtom);
  const productId = params.id;

  // get produt details
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetails(productId),
  });

  if (isLoading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error fetching product</Typography>;
  if (!product) return <Typography>No product found.</Typography>;

  // Add to cart fn
  const addToCart = () => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Box display="flex" justifyContent="center" mt={5} px={2}>
      <Card sx={{ maxWidth: 600, p: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ height: 300, objectFit: "contain", backgroundColor: "#f8f8f8", borderRadius: 2 }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">{product.title}</Typography>
          <Typography variant="h6" color="success" mt={1}>${product.price}</Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>{product.description}</Typography>
          <Typography variant="body1" fontWeight="bold" mt={2}>
            Category: <span style={{ textTransform: "capitalize" }}>{product.category}</span>
          </Typography>
          <Typography variant="body1" mt={1}>⭐ {product.rating?.rate} ({product.rating?.count} reviews)</Typography>
          <Link href={'/cart'}><Button onClick={addToCart} variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#ff4081", color: "#fff", "&:hover": { backgroundColor: "#e91e63" } }}>Add to Cart</Button></Link>
        </CardContent>
      </Card>
    </Box>
  );
}
