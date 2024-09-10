import React, {Fragment, useState , useRef, useEffect} from "react";
import "./login.css";
import {Link} from "react-router-dom";
import { useNavigate, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


axios.defaults.withCredentials = true;


const InputCreds= ()=> {
    const [des,setdes]=useState("");
    const [pwd,setpwd]=useState("");
    //const [cook,setcook]=useCookies("");

    


    const navigate=useNavigate();

    useEffect(()=>{
        if(Cookies.get('userinfo')){
            navigate('/home');
        }
    },[Cookies.get('userinfo')]);

    const onSubmitForm =async e=>{
       e.preventDefault();
       try {
          const body={"u_name":des,"pwd":pwd};

            console.log(body);
            var jsonData;
            axios.post("http://localhost:5000/login",{title:"Login Post",body:body,withCredentials:true}).then(res=>{jsonData=res;console.log(res);
            
            console.log(jsonData['data']['cook']);
            if(jsonData['data']['data'][0].c==='1'){
                Cookies.remove('userinfo');
                Cookies.set("userinfo",des,{expires:7,secure:true,sameSite:'None',path:'/'});
                navigate('/home');
            }
            else{
                alert("Login unsuccessfull");
                navigate()
            }
        });
          
       } catch (error){console.log(error)};
       
    }
    return(
        <Fragment>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

      <br></br>
      <br></br>
      <center>
      <img src={require("./assets/images.png")}/>
      </center>
      <br></br>
      <br></br>
      <center><h1>Inventory System</h1></center>
      <br></br>
      <br></br>
    <div class="container login-container">
                <div>
                    <div class="login-form-2">
                        <h2 class=".login-form-2">Login</h2>
                        <form onSubmit={onSubmitForm}>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Email " value={des} onChange={e=> {setdes(e.target.value)}}/>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" value={pwd} onChange={e=> {setpwd(e.target.value)}}/>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btnSubmit" value="Login" />
                                
                            </div>
                            <div class="form-group">
                            <a href="/register" class="ForgetPwd">Register                                  </a>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
      </Fragment>

    );
};

export default InputCreds;