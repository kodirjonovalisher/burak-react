import React from "react";
import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";

interface BasketProps {
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, change: number) => void;
}

export default function Basket({ cartItems, onRemove, onChangeQuantity }: BasketProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const open = Boolean(anchorEl);

  return (
    <Box className="hover-line">
      <IconButton
        aria-label={`Open cart, ${itemCount} items`}
        id="basket-button"
        aria-controls={open ? "basket-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Badge badgeContent={itemCount} color="secondary">
          <img src="/icons/shopping-cart.svg" alt="" />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        id="basket-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Stack className="basket-frame">
          <Box className="all-check-box">
            <Typography component="span">Cart ({itemCount})</Typography>
          </Box>
          {cartItems.length === 0 ? (
            <Box className="basket-empty">Your cart is empty.</Box>
          ) : (
            <Box className="orders-main-wrapper">
              <Box className="orders-wrapper">
                {cartItems.map((item) => {
                  const image = item.image.startsWith("http") ? item.image : `${serverApi}/${item.image}`;
                  return (
                    <Box className="basket-info-box" key={item._id}>
                      <button className="cancel-btn" aria-label={`Remove ${item.name}`} onClick={() => onRemove(item._id)}>
                        <span aria-hidden="true">×</span>
                      </button>
                      <img src={image} className="product-img" alt={item.name} />
                      <span className="product-name">{item.name}</span>
                      <p className="product-price">${item.price} × {item.quantity}</p>
                      <div className="col-2">
                        <button className="remove" aria-label={`Decrease ${item.name} quantity`} onClick={() => onChangeQuantity(item._id, -1)}>-</button>
                        <button className="add" aria-label={`Increase ${item.name} quantity`} onClick={() => onChangeQuantity(item._id, 1)}>+</button>
                      </div>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
          <Box className="basket-order">
            <span className="price">Total: ${total.toFixed(2)}</span>
            <Button variant="contained" disabled={cartItems.length === 0} onClick={() => setAnchorEl(null)}>
              Order
            </Button>
          </Box>
        </Stack>
      </Popover>
    </Box>
  );
}
