import Cookies from "js-cookie";


export const Logout=()=>{
    //const navigate=useNavigate();
    console.log("Logging out..");
    Cookies.remove('userinfo',{path:'/'});
    window.location.href='/';

};