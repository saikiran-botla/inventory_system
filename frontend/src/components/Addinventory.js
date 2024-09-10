import React, {Fragment, useState , useRef, useEffect} from "react";
import "./login.css";
import {Link} from "react-router-dom";
import { useNavigate, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


axios.defaults.withCredentials = true;


const AddInventory= ()=> {
    const [nam,setnam]=useState("");
    const [assignedto,setassignedto]=useState("");
    const [des,setdes]=useState("");
    //const [cook,setcook]=useCookies("");

    


    const navigate=useNavigate();


    const onSubmitForm =async e=>{
       e.preventDefault();
       try {
            if( nam=="" || assignedto=="" || des==""){
                alert("Fill the Damn details");
                return;
            }
          var body={'name':nam,'assignedto':assignedto,'assignedby':Cookies.get('userinfo'),'des':des};
            // console.log(body);
            // console.log(Cookies.get('userinfo'));
            var jsonData;
            axios.post("http://localhost:5000/addinven",{title:"Inventory Post",body:body,withCredentials:true}).then(res=>{jsonData=res;console.log(res);
            
            console.log(jsonData['data']);
            if(jsonData['data']['c']===0){
                alert("Something went wrong, could not add your inventory");
                return;
            }else{
                alert("Added succesfully");
                return;
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
      <center><h1>Add Inventory</h1></center>
      <br></br>
      <br></br>
    <div class="container login-container">
                <div>
                    <div class="login-form-3">
                        <h2 class=".login-form-2">Add Details</h2>
                        <form onSubmit={onSubmitForm}>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Name " value={nam} onChange={e=> {setnam(e.target.value)}}/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Assigned To" value={assignedto} onChange={e=> {setassignedto(e.target.value)}}/>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Description" value={des} onChange={e=> {setdes(e.target.value)}}/>
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btnSubmit" value="Submit" />
                                
                            </div>
                            <div class="form-group">
                            <a href="/home" class="ForgetPwd">Home                                 </a>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
      </Fragment>

    );
};

export default AddInventory;