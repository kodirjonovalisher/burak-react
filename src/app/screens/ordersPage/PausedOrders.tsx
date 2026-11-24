import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";

/** REDUX SLICE & SELECTOR */
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
);

export default function PausedOrders() {
    const { pausedOrders } = useSelector(pausedOrdersRetriever);
    const [products, setProducts] = useState<Product[]>([]);
    const orders = Array.isArray(pausedOrders) ? pausedOrders : [];

    useEffect(() => {
        const productIds = Array.from(new Set(
            orders.flatMap((order: Order) =>
                (order.orderItems ?? [])
                    .filter((item: OrderItem) =>
                        !order.productData?.some(
                            (product: Product) => String(product._id) === String(item.productId)
                        )
                    )
                    .map((item: OrderItem) => String(item.productId))
            )
        ));

        if (productIds.length === 0) {
            setProducts([]);
            return;
        }

        const productService = new ProductService();
        let active = true;

        Promise.all(productIds.map((id) => productService.getProduct(id).catch(() => null)))
            .then((results) => {
                if (active) setProducts(results.filter((product): product is Product => product !== null));
            });

        return () => {
            active = false;
        };
    }, [orders]);

    return (
        <TabPanel value={"1"}>
            <Stack>
                {orders.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((item: OrderItem, index: number) => {
                                    const product = order.productData?.find(
                                        (ele: Product) => String(ele._id) === String(item.productId)
                                    ) ?? order.productData?.[index] ?? products.find(
                                        (ele: Product) => String(ele._id) === String(item.productId)
                                    );

                                    const productImage = product?.productImages?.[0];
                                    if (!product || !productImage) return null;

                                    const imagePath = `${serverApi}/${productImage}`;
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <img
                                                src={imagePath}
                                                className={"order-dish-img"}
                                            />
                                            <p className={"title-dish"}>{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{item.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={"cancel-button"}
                                >
                                    Cancel
                                </Button>
                                <Button variant="contained" className={"pay-button"}>
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    );
                })}
                {!pausedOrders || (pausedOrders.length === 0 && (
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <img
                            src={"/icons/noimage-list.svg"}
                            style={{ width: 300, height: 300 }}
                        />
                    </Box>
                ))}
            </Stack>
        </TabPanel>
    );
}
