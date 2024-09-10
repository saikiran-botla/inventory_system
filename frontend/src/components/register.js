import React, {Fragment, useState , useRef} from "react";
import "./login.css";
import {Link} from "react-router-dom";
import { useNavigate, useParams, useHistory } from "react-router-dom";
import {useCookies} from 'react-cookie';
import axios from "axios";


axios.defaults.withCredentials = true;


const RegisterCreds= ()=> {
    const [des,setdes]=useState("");
    const [pwd,setpwd]=useState("");
    const [cook,setcook]=useCookies("");


    const navigate=useNavigate();


    const onSubmitForm =async e=>{
       e.preventDefault();
       try {
          const body={"u_name":des,"pwd":pwd};

          if(!des.includes("@aptiv.com")){
            alert("No cheating ;), Register with your Aptiv email");
            navigate('/register'); 
            return;
          }
          
          else if(des.includes("@aptiv.com")){
            console.log(body);
            var jsonData;
            axios.post("http://localhost:5000/register",{title:"Login Post",body:body,withCredentials:true}).then(res=>{jsonData=res;console.log(res);
            
            console.log();
            if(jsonData['data']['data'][0]['a']===1){
                alert("Successfully Registered, Redirecting you to the login Page");
                navigate('/');
            }
            else{
                alert("Registration unsuccessfull, try logging in");
            }

        });

          }
           
          
       } catch (error) {
         console.log(error.message);
       }
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
      <br></br>
    <div class="container login-container">
                <div>
                    <div class="login-form-2">
                        <h2 class=".login-form-2">Register</h2>
                        <form onSubmit={onSubmitForm}>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Email " value={des} onChange={e=> {setdes(e.target.value)}}/>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" value={pwd} onChange={e=> {setpwd(e.target.value)}}/>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btnSubmit" value="Register" />
                                
                            </div>
                            <div class="form-group">
                                <a href="/" class="ForgetPwd">Login Instead                                  </a>
                            </div>
                        </form>
                    </div>
                    
                    </div>
                </div>
      </Fragment>

    );
};

export default RegisterCreds;