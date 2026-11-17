import { Container } from "@mui/material";
import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";

/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
    setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
});

export default function HomePage() {
    const { setPopularDishes, setNewDishes } = actionDispatch(useDispatch());

    //Selector : Store => Data
    console.log(import.meta.env.VITE_API_URL);

    useEffect(() => {
        // Backend server data fetch =>
        const product = new ProductService();

        product
            .getProducts({
                page: 1,
                limit: 5,
                order: "productViews",
                productCollection: ProductCollection.DISH,
            }).then(data => {
                console.log("data passed here:", data);
                setPopularDishes(data);
            }

            ).catch((err) => console.log(err));


        product
            .getProducts({
                page: 1,
                limit: 4,
                order: "createdAt",
                // productCollection: ProductCollection.DISH,
            }).then(data => {
                setNewDishes(data);
            }

            ).catch((err) => console.log(err));


    }, []);


    return <div className={"homepage"}>
        <Statistics />
        <PopularDishes />
        <NewDishes />
        <Advertisement />
        <ActiveUsers />
        <Events />
    </div>;
}