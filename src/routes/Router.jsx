
import { createBrowserRouter } from "react-router-dom";
import Gallery from "../pages/Gallery.jsx";
import SignUp from "../auth/SignUp.jsx";
import Login from "../auth/LogIn.jsx";
import SketchPad from "../pages/SketchPad.jsx";
import UploadImage from "../pages/UploadImage.jsx";
import Cart from "../pages/Cart.jsx";

const route = createBrowserRouter([
    {
        path: '/', element:<Gallery/>,
    },
    {
        path: '/signUp',element:<SignUp/>
    },
    {
        path:'/logIn',element:<Login/>,
    },
    {
        path:'/sketchPad',element:<SketchPad/>
    },
    {
        path:'/uploadImage',element:<UploadImage/>
    },
    {
        path:'/cart',element:<Cart/>
    },
    {
        path:'*',element:<Gallery/>
    }


])

export default route;