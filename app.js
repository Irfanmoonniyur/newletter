const express = require('express')

const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')


app=express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function(req, res){
    res.sendFile(__dirname +'/signup.html')
})
app.post('/', function(req, res){

    const fisrtname= req.body.FirstName;
    const lastname= req.body.Last;
    const email = req.body.email;
    console.log(email)
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fisrtname,
                    LNAME:lastname
                }
            }
        ]
    }

    const jsondata=JSON.stringify(data)
    console.log(jsondata)
    const url="https://us21.api.mailchimp.com/3.0/lists/be0a4a4f00"
    const options={
        method:"POST",
        auth:"irfan:f15e3f05f7e5c0c3caaadb0452bec70d-us21"

    }

    const request =https.request(url,options,function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html")

        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
         
    
        })
    })

    request.write(jsondata)
    request.end()
});

app.post("/failure",function(req,res){
res.redirect("/")
})


app.listen(process.env.PORT || 3000,function(){
    console.log('listening on port 3000')
});





// a18b05c9f69339d1f8b381a68b36a410-us21
// f15e3f05f7e5c0c3caaadb0452bec70d-us21
// be0a4a4f00.