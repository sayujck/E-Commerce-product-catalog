"use client";

import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtom";
import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

export default function CartPage() {
    const [cart, setCart] = useAtom(cartAtom);

    // Increase quantity
    const increaseQuantity = (id: number) => {
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        );
    };

    // Decrease quantity
    const decreaseQuantity = (id: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        );
    };

    // Remove item
    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Calculate total cost
    const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                Shopping Cart
            </Typography>

            {cart.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Avatar
                                                variant="square"
                                                src={item.image}
                                                alt={item.title}
                                                sx={{ width: 50, height: 50, borderRadius: 1 }}
                                            />
                                        </TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                                                <Button size="small" variant="outlined" sx={{ minWidth: 30, px: 1, py: 0 }} onClick={() => decreaseQuantity(item.id)}>-</Button>
                                                <Typography component="span" sx={{ fontWeight: "bold", minWidth: 20, textAlign: "center" }}>
                                                    {item.quantity}
                                                </Typography>
                                                <Button size="small" variant="outlined" sx={{ minWidth: 30, px: 1, py: 0 }} onClick={() => increaseQuantity(item.id)}>+</Button>
                                            </Box>
                                        </TableCell>
                                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button size="small" variant="contained" color="error" onClick={() => removeItem(item.id)}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Typography variant="h5" sx={{ mt: 3, textAlign: "right" }}>
                        Total Cost: ${totalCost.toFixed(2)}
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mt: 3, py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
                    >
                        Proceed to Checkout
                    </Button>
                </>
            )}
        </Box>
    );
}
