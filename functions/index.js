const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const { resolveSoa } = require("dns");
const { response } = require("express");

const cors = require("cors")
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
const fs = require("fs");




app.use("/scripts", express.static("./public/scripts"))
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.use(cors({origin: true}))

app.get("/get_curr_temp", (req, res) => {
    axios({
        method: 'get',  
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=49.243252&lon=-122.974190&exclude=minutely,daily,alerts&appid=${process.env.weatherApiKey}&units=metric`
    })
.then(response => {
    let hourly = response.data.hourly; 
    console.log("🚀 ~ file: index.js ~ line 75 ~ app.get ~ response.data.hourly", response.data.hourly)

    let hourly_temp = []
    for (let i = 0; i < 14; i++){
      ele = hourly[i];
      var myDate = new Date(ele.dt * 1000);
      var pstDate = myDate.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles"
      })
      .slice(-11, -1) + "m";
      // let hour = pstDate.slice(-11, -9);
      // let len = pstDate.length;
      // let timeOfDay = pstDate.slice(len-2, len);
      hourly_temp.push({
              time: pstDate,
          temp: ele.temp, 
          feelsLike : ele.feels_like, 
          humidity: ele.humidity,
          wind: ele.wind_speed, 
          icon: ele.weather,
      })
      }
      console.log(hourly_temp)
      console.log(response.data.hourly[0].weather)

      return hourly_temp
})
})
exports.api = functions.https.onRequest(app);