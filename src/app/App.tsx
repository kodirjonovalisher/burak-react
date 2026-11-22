import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import HelpPage from "./screens/helpPage";
import { CartItem } from "../lib/types/search";

function App() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cartData");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  /** HANDLERS **/

  const onAdd = (input: CartItem) => {
    const exist = cartItems.find((item) => item._id === input._id);
    let cartUpdate: CartItem[];
    if (exist) {
      cartUpdate = cartItems.map((item) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
    } else {
      cartUpdate = [...cartItems, { ...input }];
    }
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };
  const onRemove = (id: string) => {
    const cartUpdate = cartItems.filter((item) => item._id !== id);
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };
  const onChangeQuantity = (id: string, change: number) => {
    const cartUpdate = cartItems
      .map((item) => item._id === id ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0);
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };
  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cartItems={cartItems} onRemove={onRemove} onChangeQuantity={onChangeQuantity} />
      ) : (
        <OtherNavbar cartItems={cartItems} onRemove={onRemove} onChangeQuantity={onChangeQuantity} />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
