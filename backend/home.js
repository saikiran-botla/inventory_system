const cors=require('cors');
var pool=require('./db');
const bcrypt = require('bcryptjs');

exports.createUser=async function(req,res){
    try{
        var query="select * from users";
        var q_res=await pool.query(query);
        res.json(q_res.rows);
    }
    catch(err){
        console.log(err);
    }
};

exports.login=async function(req,res){
    try {
        //console.log(req.body.body);
        console.log(req);
        var u_name=req.body.body.u_name;
        //console.log(u_name);
        var password=req.body.body.pwd; 
        var hashed_password=await bcrypt.hash(password,10);
        
        var query="select count(*) as c from users where email=$1 and passwd=$2;";
        
        var q_res=await pool.query(query,[u_name,password]);
        console.log(q_res.rows);
        
        //req.session.name=u_name;
        //console.log(req.sessionID);

        res.json({cook:req.sessionID,data:q_res.rows});

    } catch (err) {
        console.log(err);
    }
};

exports.register=async function(req,res){
    try {
        var u_name=req.body.body.u_name;
        //console.log(u_name);
        var password=req.body.body.pwd; 
        var hashed_password=await bcrypt.hash(password,10);
        
        var query="select count(*) as c from users where email=$1";
        
        var q_res=await pool.query(query,[u_name]);
        console.log(q_res.rows[0]['c'])
        if(q_res.rows[0]['c']==1){
            res.json({cook:req.sessionID,data:[{"a":0}]});
        }
        else{
            var q="insert into users values($1,$2,0);";
            q_res=await pool.query(q,[u_name,password]);
            res.json({cook:req.sessionID,data:[{"a":1}]});
        }

    } catch (error) {
        console.log(error);
    }
}

exports.fetchInven=async function(req,res){
    try {
        var query='select name,slave_email,master_email,dt,des from inventory;';
        var q_res=await pool.query(query);
        res.json({data:q_res.rows});
    } catch (error) {
        console.log(error);
    }
}

exports.addinven=async function(req,res){
    try {
        var name=req.body.body.name;
        var assignedby=req.body.body.assignedby;
        var assignedto=req.body.body.assignedto;
        var des=req.body.body.des;
        var query='insert into inventory(name,slave_email,master_email,dt,des) values($1,$2,$3,CURRENT_TIMESTAMP,$4);';

        var q_res=await pool.query(query,[name,assignedto,assignedby,des]);
        console.log(q_res.rows);
        res.json({data:q_res.rows,c:1});
    } catch (error) {
        res.json({c:0});
        console.log(error);
    }
}

exports.deleInven=async function(req,res){
    try {
        var name=req.body.body.nam;
        var assignedby=req.body.body.assignedby;
        var assignedto=req.body.body.assignedto;
        var dt=req.body.body.dt;
        var quer="delete from inventory where name=$1 and assignedby=$2 and assignedto=$3 and dt=$4";
        var query_res=await pool.query(quer,[name,assignedby,assignedto,dt]);
        console.log(query_res.rows);
        res.json({data:query_res,c:1});
    } catch (error) {
        res.json({c:0});
        console.log(error);
    }
}