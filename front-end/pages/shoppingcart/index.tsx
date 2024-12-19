import ShoppingCartService from "@services/ShoppingCartService";
import { Product, ShoppingCart } from "@types";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import QuantityDropdown from "@components/quantityDropdown";
import useSWR from "swr";
import Header from "@components/header";
import ShoppingCartOverview from "@components/shoppingcart/shoppingCartOverview";


const ShoppingCartPage = () => {
    return (
        <>  
        <Header/>

        <main>
            <ShoppingCartOverview/>
        </main>
        </>
    )
};

export default ShoppingCartPage;