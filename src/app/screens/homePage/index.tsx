import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css"

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>();

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
                dispatch(setPopularDishes(data));
            }

            ).catch((err) => console.log(err));


        product
            .getProducts({
                page: 1,
                limit: 4,
                order: "createdAt",
                // productCollection: ProductCollection.DISH,
            }).then(data => {
                dispatch(setNewDishes(data));
            }

            ).catch((err) => console.log(err));

        const member = new MemberService();
        member
            .getTopUsers()
            .then(data => dispatch(setTopUsers(data)))
            .catch((err) => console.log(err));

    }, [dispatch]);


    return <div className={"homepage"}>
        <Statistics />
        <PopularDishes />
        <NewDishes />
        <Advertisement />
        <ActiveUsers />
        <Events />
    </div>;
}
