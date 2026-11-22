import React, { useEffect, useState } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom"; // @ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/swiper-bundle.min.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setRestaurant, setChosenProduct } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
    setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const chosenProductRetriever = createSelector(
    retrieveChosenProduct,
    (chosenProduct) => ({
        chosenProduct,
    })
);
const restaurantRetriever = createSelector(
    retrieveRestaurant,
    (restaurant) => ({
        restaurant,
    })
);
interface ChosenProductProps {
    onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
    const { onAdd } = props;
    const { productId } = useParams<{ productId: string }>();
    const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
    const { chosenProduct } = useSelector(chosenProductRetriever);
    const { restaurant } = useSelector(restaurantRetriever);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setLoadError(false);
        const product = new ProductService();
        product
            .getProduct(productId)
            .then((data) => {
                if (active) setChosenProduct(data);
            })
            .catch((err) => {
                console.error("Could not load product details:", err);
                if (active) setLoadError(true);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        const member = new MemberService();
        member
            .getRestaurant()
            .then((data) => {
                if (active) setRestaurant(data);
            })
            .catch((err) => console.error("Could not load restaurant details:", err));

        return () => {
            active = false;
        };
    }, [productId]);

    if (loading) {
        return <div className="chosen-product"><Box className="title">Loading product…</Box></div>;
    }
    if (loadError || !chosenProduct || chosenProduct._id !== productId) {
        return (
            <div className="chosen-product">
                <Box className="title">Product details are unavailable. Check that the API server is running.</Box>
            </div>
        );
    }
    return (
        <div className={"chosen-product"}>
            <Box className={"title"}>Product Detail</Box>
            <Container className={"product-container"}>
                <Stack className={"chosen-product-slider"}>
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="swiper-area"
                    >
                        {chosenProduct?.productImages.map(
                            (ele: string, index: number) => {
                                const imagePath = `${serverApi}/${ele}`;
                                return (
                                    <SwiperSlide key={index}>
                                        <img className="slider-image" src={imagePath} />
                                    </SwiperSlide>
                                );
                            },
                        )}
                    </Swiper>
                </Stack>
                <Stack className={"chosen-product-info"}>
                    <Box className={"info-box"}>
                        <strong className={"product-name"}>{chosenProduct?.productName}</strong>
                        <span className={"resto-name"}>{restaurant?.memberNick}</span>
                        <span className={"resto-name"}>{restaurant?.memberPhone}</span>
                        <Box className={"rating-box"}>
                            <div className={"evaluation-box"}>
                                <div className={"product-view"}>
                                    <span>Views: {chosenProduct?.productViews}</span>
                                </div>
                            </div>
                        </Box>
                        <p className={"product-desc"}> {chosenProduct?.productDesc ?
                            chosenProduct?.productDesc : "No Description"}</p>
                        <Divider height="1" width="100%" bg="#000000" />
                        <div className={"product-price"}>
                            <span>Price:</span>
                            <span>${chosenProduct?.productPrice}</span>
                        </div>
                        <div className={"button-box"}>
                            <Button
                                variant="contained"
                                onClick={() => onAdd({
                                    _id: chosenProduct._id,
                                    quantity: 1,
                                    name: chosenProduct.productName,
                                    price: chosenProduct.productPrice,
                                    image: chosenProduct.productImages[0],
                                })}
                            >Add To Basket</Button>
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
