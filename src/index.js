// const http=require("http");
// const fs=require('fs');
// const server=http.createServer((req,res)=>{
//     const data=fs.readFileSync(`E:/NodeJS/weatherWeb/home.html`,"utf-8");
//     const objData=JSON.parse(data);
//     if(req=="/"){
//         // res.write("home");
//         res.writeHead(200,{"content-type":"application/json"});
//         res.end(JSON.stringify(objData));
//     }
//     else{
//         res.end("File not found");
//     }
// })
// server.listen(8000,"127.0.0.1",()=>{
//     console.log("server is running");
// });




// const express=require("express");
// const app=express();
// const path=require("path");
// const viewPath=path.join(__dirname,"../views")
// app.set("view engine","hbs");
// app.set("views",viewPath);

// app.get("/",function(req,res){

//     res.render("home");
// })
// app.listen(8000,(req,res)=>{
//     console.log("server is running");
// })



const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

const viewPath = path.join(__dirname, "../views");
app.set("view engine", "hbs");
app.set("views", viewPath);

app.get("/", async function (req, res) {
    try {
        // Make a request to the OpenWeatherMap API
        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=32a9ee32c008c8d16f868952574753fe"
        );

        // Extract relevant data from the API response
        const weatherData = {
            temperature: parseInt((response.data.main.temp)-273.15),
            des: response.data.weather[0].description,
            city: response.data.name,
            min_temp:parseInt((response.data.main.temp_min)-273.15),
            max_temp:parseInt((response.data.main.temp_max)-273.15),
            country:response.data.sys.country,
        };

        // Render the home.hbs template and pass the weatherData to it
        res.render("home", { weatherData });
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).send("Error fetching weather data");
    }
});

app.listen(8000, () => {
    console.log("Server is running");
});
