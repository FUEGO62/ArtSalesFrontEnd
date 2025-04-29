import { useViewCartQuery } from '../services/ArtSalesAPI.jsx';
import Card from "../reusables/Card.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";
import style from "./Cart.module.css";

function Navbar() {
    const navigate = useNavigate();
    const handleBackToGallery = () => {

        navigate("/");
    };

    return (
        <nav className={style.navbar}>
            <div className={style.logo}>ArtSpace </div>
            <button className={style.backButton} onClick={handleBackToGallery}>
                Back to Gallery
            </button>
        </nav>
    );
}

export default function Cart() {
    const { data: artworks = [], isLoading, error } = useViewCartQuery();

    return (
        <>
            <Navbar/>
            <div className={style.cartContainer}>
                <h2>Your Cart</h2>
                {artworks.length === 0 ? (
                    <p className={style.emptyCart}>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className={style.cartList}>
                            {artworks?.map((art) => (
                                <Card artWork={art} key={art.id} from="cart"/>
                            ))}
                        </ul>
                        <div className={style.checkout}>
                            <button>Checkout</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
