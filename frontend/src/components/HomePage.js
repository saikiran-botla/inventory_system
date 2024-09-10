import React, {Fragment, useState , useRef, useEffect} from "react";
import "./login.css";
import {Link} from "react-router-dom";
import { useNavigate, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {Logout} from "./Logout";
import './styles.css';

axios.defaults.withCredentials = true;

const deleteInven=async (nam,assignto,assignedby,dt)=>{
    //const navigate=useNavigate();
    // var nam=props.name;
    // var assignto=props.assignto;
    // var assignedby=props.assignedby;
    // var dt=props.dt;
    var body={'nam':nam,'assignto':assignto,'assignedby':assignedby,'dt':dt};
    await axios.delete("http://localhost:5000/deleteInven",{title:"Delete post",body:body,withCredentials:true}).then(res=>{
        console.log(res);

        
    });
    
}


const HomePage= ()=> {

    const navigate=useNavigate();

    const routeChange=()=>{
        navigate('/addinventory');
    }
    const deleteInven=async (e,nam,assignto,assignedby,dt)=>{
        //const navigate=useNavigate();
        // var nam=props.name;
        // var assignto=props.assignto;
        // var assignedby=props.assignedby;
        // var dt=props.dt;
        var body={'nam':nam,'assignto':assignto,'assignedby':assignedby,'dt':dt};
        await axios.delete("http://localhost:5000/deleteInven",{title:"Delete post",body:body,withCredentials:true}).then(res=>{
            console.log(res);
    
            
        });
        
    }

    useEffect(()=>{
        if(!Cookies.get('userinfo')){
            navigate('/');
        }
    },[Cookies.get('userinfo')]);


    const [invendata,setInvendata]=useState();

    const query_res= async()=>{
        await axios.get("http://localhost:5000/fetchinven",{withCredentials:true}).then(
            (res) =>{
                console.log(res);
                var data=res['data']['data'];
                setInvendata((Object.entries(data)));
                console.log(data);
            
        
        //const res=await response.json();
            });
    };



    useEffect(()=>{
        query_res();
    },[]);

    console.log(invendata);

    return(
        <Fragment>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <div >
      <br></br>
      <br></br>
      <center>
      <img src={require("./assets/images.png")}/>
      </center>
      <br></br>
      <br></br>
      <div className="styledDiv">
      <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Inventory Name</th>
                <th scope="col">Assigned to</th>
                <th scope="col">Assigned by</th>
                <th scope="col">Date of Assigning</th>
                <th scope="col">description</th>
                <th scope="col"> Action</th>
                </tr>
            </thead>
            <tbody >
                {invendata?.map(it=>
                <tr>
                <th scope="row">{it[0]}</th>
                <td className=".table_grid">{it[1]['name']}</td>
                <td className=".table_grid">{it[1]['slave_email']}</td>
                <td>{it[1]['master_email']}</td>
                <td>{it[1]['dt']}</td>
                <td>{it[1]['des']}</td>
                <td><button onClick={(e)=>{deleteInven(e,it[1]['name'], it[1]['slave_email'],it[1]['master_email'], it[1]['dt'])}}></button></td>

                </tr>
                )}
            </tbody>
            </table>
      </div>
      <div className="styledDiv1">
      <table >
        <tbody>
            <tr>
                <th></th>
                <td><button className="logoutbtn1" href="#" onClick={routeChange}>Add Inventory</button></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button className="logoutbtn" href="#" onClick={Logout}>Logout</button></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
      </table>
      </div>
        </div>
      </Fragment>
    );
};

export default HomePage;