import {useSignUpMutation} from '../services/ArtSalesAPI.jsx'
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import styles from "./SignUp.module.css"



function SignUp() {
    const navigate = useNavigate();
    const[signUpRequest, { data,error,isLoading}] = useSignUpMutation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await signUpRequest({email,password,phoneNumber,fullName,address});
            console.log(response)

            navigate("/logIn")
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={styles.box}>
                <div className={styles.top}>
                    <div className={styles.profile}></div>
                    <p>The Gallery</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input name="email" value={email} type="text" placeholder="  enter your email"
                           onChange={(e) => setEmail(e.target.value)}/>

                    <input name="phoneNumber" value={phoneNumber} type="text" placeholder="  enter your phoneNumber"
                           onChange={(e) => setPhoneNumber(e.target.value)}/>

                    <input name="address" value={address} type="text" placeholder="  enter your address"
                           onChange={(e) => setAddress(e.target.value)}/>

                    <input name="fullName" value={fullName} type="text" placeholder="  enter your full name"
                           onChange={(e) => setFullName(e.target.value)}/>

                    <input className={styles.password} name="password" value={password} type="password"
                           placeholder="  enter your password"
                           onChange={(e) => setPassword(e.target.value)}/>
                    {error?.data && <p className={styles.error}>{error.data?.message}</p>}
                    {error?.error && <p className={styles.error}>your network is unstable</p>}
                    <button type="submit">SIGN UP</button>
                    <p>already have an account <a href="/logIn">log In?</a></p>

                </form>
            </div>
        </>
    )
}

export default SignUp;



