const express = require('express');
const bodyParser = require('body-parser');
const fs  = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/assets',express.static('assets'));

app.get('/register',(req,res) => {
    res.render('register');
});
app.get('/login',(req,res) => {
    res.render('login')
});


app.post('/validate',(request,response) =>{
    const user = request.body.user;
    const pass = request.body.pass;
    fs.readFile('./assets/users/data.json','utf8', (err,data) => {
        if(err) throw err;
        else {
            let obj = JSON.parse(data);
            let check = obj.find((element) => element.username == user);
            if(check === undefined){
                console.log({statusCode : 404,message : "oops !! User not found !!"});
                response.status(404).send({statusCode : 404,message : "oops !! User not found !!"});
            }
            else {
                let Dbpass = check.password;
                bcrypt.compare(pass,Dbpass,(err,res) => {
                    if(err) response.status(500).json({statusCode : 500,message : "Server under maintenance !! Please try again in some time."});
                    if(!res) response.status(404).json({statusCode : 401,message : "oops !! Wrong Password !!"});
                    else { 
                        console.log({statusCode : 200,message : `${user} logged in successfully !!`, information : check});
                        response.render('success');
                    }
                })
            }
        }
    })
})
app.post('/insert',(req,res) => {
    const username = req.body.user;
    let password = req.body.pass;
    const phoneNumber = req.body.pn;
    bcrypt.hash(password,10,(err,hash) =>{
        if(err) throw err;
        else {
            fs.readFile('./assets/users/data.json','utf8',(err,data) => {
                if(err) throw err;
                else {
                    let temp = JSON.parse(data);
                    const id = temp[temp.length-1].id +1;
                    var newUser = {"id" : id,"phoneNumber" : phoneNumber,"username" : username,"password" : hash};
                    temp.push(newUser);
                    json = JSON.stringify(temp,null,2);
                    fs.writeFile('./assets/users/data.json', json,'utf8',(err) => {
                        if(err) throw err; 
                        else {
                            console.log({statusCode : 200,message : `${username} registered successfully !!`,information : newUser });
                            res.render('success');
                        }
                    })
                }
            })
        }
    })
})

app.listen(3000,() => {
    console.log("Running :)");
})
