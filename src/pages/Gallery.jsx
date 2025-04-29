import styles from "./Gallery.module.css";
import { useNavigate } from "react-router-dom";
import cart from "../assets/cart.png";
import { useViewGalleryQuery, useViewCategoryMutation } from "../services/ArtSalesAPI.jsx";
import Card from "../reusables/Card.jsx";
import { useEffect, useState } from "react";

export default function Gallery() {
    const navigate = useNavigate();
    const letter = localStorage.getItem("email")?.charAt(0).toUpperCase() || "?";

    const { data: gallery = [], error, isLoading,refetch } = useViewGalleryQuery();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryGallery = [],{ isLoading: categoryLoading }] = useViewCategoryMutation(selectedCategory, {
        skip: !selectedCategory,
    });

    const [body, setBody] = useState(gallery);

    useEffect(() => {
        try {
            refetch();
            if (body.length === 0) {
                setBody(gallery);
            }
        }
        catch (error) {
            console.log(error);
        }
    },[gallery],[body]);


    const handleCategoryClick = async (e,category) => {
        try {
            e.preventDefault()
            if (category === "") {

                setBody(gallery)
            } else {
                const response = await categoryGallery({category: category});
                setBody(response.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className={styles.navbar}>
                <div className={styles.left}>
                    <button onClick={() => navigate("/sketchPad")} className={styles.logo}>
                        {letter}
                    </button>
                </div>
                <div className={styles.categories}>
                    <button onClick={(e) => handleCategoryClick(e,"")} className={styles.category}>ALL</button>
                    <button onClick={(e) => handleCategoryClick(e,"ABSTRACT")} className={styles.category}>ABSTRACT</button>
                    <button onClick={(e) => handleCategoryClick(e,"REALISM")} className={styles.category}>REALISM</button>
                    <button onClick={(e) => handleCategoryClick(e,"NATURE")} className={styles.category}>NATURE</button>
                    <button onClick={(e) => handleCategoryClick(e,"SURREALISM")} className={styles.category}>SURREALISM</button>
                    <button onClick={(e) => handleCategoryClick(e,"POTTERY")} className={styles.category}>POTTERY</button>
                    <button onClick={(e) => handleCategoryClick(e,"SCULPTURE")} className={styles.category}>SCULPTURE</button>
                    <button onClick={(e) => handleCategoryClick(e,"OTHER")} className={styles.category}>OTHER</button>
                </div>
                <div className={styles.cart}>
                    <img src={cart} alt="cart" onClick={()=> navigate("/cart")}/>
                </div>
            </div>

            <div className={styles.canvas}>
                {isLoading || categoryLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={styles.galleryBody}>
                        {body.length > 0 ? (
                            body.map((artWork) => (
                                <Card key={artWork.id} artWork={artWork} from = "gallery"/>
                            ))
                        ) : (
                            <p>No artwork found in this category.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
