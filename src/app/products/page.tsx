"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Select, MenuItem, Box, FormControl } from "@mui/material";
import { fetchAllProducts, fetchProductsByCategory } from "../lib/api";
import { CircularProgress } from '@mui/material';
import Link from "next/link";


export default function HomePage() {
  const [category, setCategory] = useState(""); 
  const [sortBy, setSortBy] = useState("");


  // get all products or get products by category
  const { data: products, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => (category ? fetchProductsByCategory(category) : fetchAllProducts()),
  });

  const sortedProducts = products
  ? [...products].sort((a, b) => {
      if (sortBy === "priceLowHigh") 
        return a.price - b.price;
      if (sortBy === "priceHighLow") 
        return b.price - a.price;
      if (sortBy === "ratingHighLow") 
        return b.rating.rate - a.rating.rate;
      return 0;
    })
  : [];


  if (isLoading) return <Box display="flex" justifyContent="center" mt={20}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center">Error loading products</Typography>;

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 4 }}>
      {/* Category filt */}
      <FormControl sx={{ minWidth: 200, mb: 3}}>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          sx={{ backgroundColor: "#fff", color: "#000", borderRadius: 2 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="jewelery">Jewelry</MenuItem>
          <MenuItem value="men's clothing">Men's Clothing</MenuItem>
          <MenuItem value="women's clothing">Women's Clothing</MenuItem>
        </Select>
      </FormControl>

      {/* Sort by price & rating */}
      <FormControl sx={{ minWidth: 200, mb: 3, pl: 4 }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
          sx={{ backgroundColor: "#fff", color: "#000", borderRadius: 2 }}
        >
          <MenuItem value="">Sort by</MenuItem>
          <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
          <MenuItem value="ratingHighLow">Rating: High to Low</MenuItem>
        </Select>
      </FormControl>


      {/* Products */}
      <Grid container spacing={3}>
        {sortedProducts?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardMedia
                component="img"
                height="250"
                sx={{ width: "100%", height: "200px", objectFit: "contain", padding: 2, backgroundColor: "#f8f8f8" }}
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#e91e63", fontWeight: "bold", mt: 1 }}>
                  ${product.price}
                </Typography>
                <Link href={`/products/${product.id}`} passHref>
                  <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#ff4081", color: "#fff", "&:hover": { backgroundColor: "#e91e63" } }}>
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
