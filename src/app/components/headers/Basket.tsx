import React from "react";
import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket({ cartItems, onAdd, onRemove, onDelete, onDeleteAll }: BasketProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = total < 100 && cartItems.length > 0 ? 5 : 0;
  const totalPrice = (total + shippingCost).toFixed(1);
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
            <Typography component="span">Cart Products:</Typography>
            {cartItems.length > 0 && (
              <button
                className="delete-all-btn"
                type="button"
                aria-label="Delete all products from basket"
                title="Delete all"
                onClick={onDeleteAll}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm13-15h-3.5l-1-1h-5l-1 1H5v2h14V4zM8 9h2v9H8zm6 0h2v9h-2z" />
                </svg>
              </button>
            )}
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
                      <button className="cancel-btn" aria-label={`Remove ${item.name}`} onClick={() => onDelete(item)}>
                        <span aria-hidden="true">×</span>
                      </button>
                      <img src={image} className="product-img" alt={item.name} />
                      <span className="product-name">{item.name}</span>
                      <p className="product-price">${item.price} × {item.quantity}</p>
                      <div className="col-2">
                        <button className="remove" aria-label={`Decrease ${item.name} quantity`} onClick={() => onRemove(item)}>-</button>
                        <button className="add" aria-label={`Increase ${item.name} quantity`} onClick={() => onAdd(item)}>+</button>
                      </div>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
          {cartItems.length > 0 && (
            <Box className="basket-order">
              <span className="price">Total: ${totalPrice} ({total} + {shippingCost})</span>
              <Button variant="contained" onClick={() => setAnchorEl(null)}>Order</Button>
            </Box>
          )}
        </Stack>
      </Popover>
    </Box>
  );
}
