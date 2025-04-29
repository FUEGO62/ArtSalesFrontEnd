

import {useLogInMutation} from '../services/ArtSalesAPI.jsx'
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import styles from  "./LogIn.module.css"

export default function Login() {

    const navigate = useNavigate();

    const[logInRequest, {data,error,isLoading}] = useLogInMutation()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const response = await logInRequest({email,password}).unwrap();

            console.log(response.response)
            localStorage.setItem("user", JSON.stringify(response.response))
            console.log(email)
            localStorage.setItem("token",response.message);
            localStorage.setItem("email",email)
            navigate("/")

        }
        catch(error) {
            console.log(error.data)
        }
    }

    return (
        <>
            <>
                <div className={styles.box}>
                    <div className={styles.top}>
                        <div className={styles.newProfile}></div>
                        <p>Welcome back</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input name="email" value={email} type="text" placeholder="  enter your email"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <input className={styles.password} name="password" value={password} type="password" placeholder="  enter your password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        {error?.data && <p className={styles.error}>{error.data?.message}</p>}
                        {error?.error && <p className={styles.error}>your network is unstable</p>}
                        <button type="submit">LOG IN</button>
                        <p>dont have an account <a href="/signUp">sign up</a> </p>

                    </form>
                </div>
            </>

        </>
    )

}


