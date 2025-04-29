import styles from './SketchPad.module.css'
import {useNavigate} from "react-router-dom";
import { useViewUploadedArtQuery } from "../services/ArtSalesAPI.jsx";
import Card from "../reusables/Card.jsx";
import {useEffect} from "react";


export default  function SketchPad(){
    const navigate = useNavigate();
    const {data: sketches=[],isLoading,error} = useViewUploadedArtQuery();
    if(error){
        console.log(error)
        navigate("/logIn")
    }

    return (
        <>
            <div className={styles.sideBar}>
                <div className={styles.sideInfo}>
                    <button onClick={() => {
                        navigate("/uploadImage")
                    }}>
                        UPLOAD
                    </button>
                    <button onClick={() => {
                        navigate("/")
                    }}>
                        GALLERY
                    </button>
                </div>
            </div>
            <div className={styles.body}>
                {sketches?.length === 0 && !isLoading && (
                    <div>
                    seems like your sketchpad is empty ...
                    <a href="/uploadImage">upload?</a>
                    </div>
                )}
                {
                    sketches && sketches?.length > 0 && (
                        <div className={styles.sketches}>
                            {
                            sketches?.map((sketch) => (
                            <Card key={sketch?.id} artWork={sketch} from ="sketchPad"/>
                            ))
                            }
                        </div>
                    )
                }
                {isLoading && (
                    <>loading...</>
                )}

            </div>
        </>
    )
}