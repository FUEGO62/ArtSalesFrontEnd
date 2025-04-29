
import React, {useEffect, useState} from "react";
import style from "./UploadImage.module.css";
import {useNavigate} from "react-router-dom";
import { useUploadArtworkMutation } from "../services/ArtSalesAPI.jsx";

export default function UploadImage() {
    const address = JSON.parse(localStorage.getItem("user")).address;
    const [uploadArtWorkRequest, { data, isLoading }] = useUploadArtworkMutation();

    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const prompt = "Choose a category:   ";


    useEffect(() => {
        if (image && category && price && title && description) {
            submitArtwork();
        }
    }, [image]);

    const handleImageChange = (event) => {
        try{
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                try {
                    const base64Image = reader.result;
                    localStorage.setItem("image", base64Image);
                    setImage(base64Image);
                }
                catch (error){
                    alert("image is too large")
                }
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
        catch (error) {
            console.log(error);
            alert("image file is too large")
        }
    };

    async function submitArtwork() {
        localStorage.setItem("title", title);
        localStorage.setItem("description", description);

        try {
            const response = await uploadArtWorkRequest({
                category,
                title,
                description,
                image,
                address,
                stock: 1,
                price
            });
            console.log(response);
            navigate("/sketchPad");
        } catch (error) {
            console.error("Error uploading artwork:", error);
        }
    }

    function onClose() {
        navigate("/sketchPad");
    }

    return (
        <div className={style.background} onClick={onClose}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={style.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h3>Upload your work</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className={style.title}
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="enter title"
                    />
                    <input
                        name="description"
                        className={style.description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder=" enter description"
                    />

                    <input
                        className={style.price}
                        type="number"
                        placeholder="enter price in NGN"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <span>{prompt}
                        <select
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">-Select a category-</option>
                            <option value="ABSTRACT">ABSTRACT</option>
                            <option value="REALISM">REALISM</option>
                            <option value="NATURE">NATURE</option>
                            <option value="SURREALISM">SURREALISM</option>
                            <option value="POTTERY">POTTERY</option>
                            <option value="SCULPTURE">SCULPTURE</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                    </span>

                    <label className={style.uploadImage}>
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={style.hidden}
                        />
                    </label>


                    <button type="submit" className={style.invisible}></button>
                </form>
            </div>
        </div>
    );
};
