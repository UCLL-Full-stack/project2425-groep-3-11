import Head from "next/head";
import ProductsOverview from "@components/product/productsOverview";
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