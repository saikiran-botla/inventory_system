const cors=require('cors');
const express=require('express')
const app=express()

app.use(express.json());

var config=require('./../config.json');

const corsOptions = {
    origin: 'http://localhost:3000',  //Your Client, do not write '*'
    credentials: true,
};
app.use(cors(corsOptions));

var home=require('./home')


app.post('/login',home.login);
app.post('/register',home.register);
app.get('/fetchinven',home.fetchInven);
app.post('/addinven',home.addinven);
app.delete('/deleteInven',home.deleInven);
app.listen(config['backendport'],()=>{ console.log("Server started in port",config['backendport'])})