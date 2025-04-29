import style from './Card.module.css'
import { useAddToCartMutation,useTakeDownArtWorkMutation,useRemoveFromCartMutation } from "../services/ArtSalesAPI.jsx";
import {useNavigate} from "react-router-dom";


export default function Card({artWork,from}) {

    const navigate = useNavigate();

    const [addToCartRequest,{error}] = useAddToCartMutation();
    const[takeDownRequest,{data,isLoading}] = useTakeDownArtWorkMutation();
    const [removeFromCartRequest] = useRemoveFromCartMutation();

    async function addToCart(e){
        try {
            e.preventDefault()
            const response = await addToCartRequest({artWorkId:artWork.id,email:localStorage.getItem("email")})

            if(response?.error.status===403){
                navigate("/logIn")
            }
        }
        catch (error) {
            console.log(error,"hello")
        }

    }

    async function removeFromCart(e){
        try {
            e.preventDefault()
            const response = await removeFromCartRequest({artWorkId: artWork.id, email: localStorage.getItem("email")})
        }
        catch (error) {
            console.log(error)
        }
    }

    async function takeDown(e){
        try {
            e.preventDefault()
            const response = await takeDownRequest({artWorkId: artWork.id, email: localStorage.getItem("email")})
        }
        catch (error) {
            console.log(error)
        }
    }

    const art  = artWork;
    return (
        <div className={style.card}>
            <div className={style.image}>
                <img src={art.image} alt=""/>
            </div>
            <div className={style.content}>
                <h3>{art.title}</h3>
                <p>{art.description}</p>
                <p>{art.price}NGN</p>
            </div>
            {from==="gallery" && (
                <button className={style.variableButtons} onClick={(e) => addToCart(e)}>ADD TO CART</button>
            )}
            {
                from==="sketchPad" && (
                    <button className={style.variableButtons}  onClick={(e)=>takeDown(e)}> TAKE DOWN</button>
                )
            }
            {
                from==="cart" && (
                    <button className={style.variableButtons}  onClick={(e)=>removeFromCart(e)}>REMOVE</button>
                )
            }
        </div>
    )
}