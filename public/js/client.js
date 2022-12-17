ready(function () {
    function ajaxGET(url, callback){

        const xhr = new XMLHttpRequest();
        // console.log("xhr", xhr);
        xhr.onload = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
                // console.log("responseText:" + xhr.responseText);
                callback(this.responseText);
            } else {
                // console.log("something went wrong")
                console.log(this.status)
            }
        }

        url = "https://us-central1-cameron-fung.cloudfunctions.net" + url; 

        xhr.open("GET",  url);
        xhr.send();
    }
    document.querySelector("#get-curr-temp").addEventListener("click", function (e){
        let getWeather = firebase.functions().httpsCallable("getWeather")
        getWeather()
        .then((response) => {
            let data = response.data;
            let hourly_temp = JSON.parse(data);
            let project2 = document.querySelector("#project2");
            let template = document.querySelector("#weather-card");
            for (ele of hourly_temp){
              let clone = template.content.cloneNode(true);
              clone.querySelector("#time").innerHTML = ele.time
              clone.querySelector("#temp").innerHTML = ele.temp + "&#8451";
              clone.querySelector("#feels-like").innerHTML += " " +  ele.feelsLike + "&#8451;"
              clone.querySelector("#humidity").innerHTML += " " + ele.humidity
              clone.querySelector("#wind").innerHTML += " " + ele.wind
              clone.querySelector("#weather-icon").src = "https://openweathermap.org/img/wn/" + ele.icon[0].icon + "@2x.png"
              project2.appendChild(clone);
            }            
            let button = document.querySelector("#get-curr-temp"); 
            if (button.textContent === "Click Here"){
                $("#project2").slideUp(0);
                $("#project2").slideDown(1000);
                button.textContent = "Hide Weather"
            } 
            else if (button.textContent === "Hide Weather"){
                $("#project2").slideUp(1000);
                button.textContent = "Click here"
            }
            // new Chart("myChart", {
            //     type: "scatter",
            //     data: {
            //       datasets: [{
            //         pointRadius: 4,
            //         pointBackgroundColor: "rgb(255,255,255)",
            //         data: hourly_temp,
            //         fill : true,
            //       }], 
            //     },
            //     showLine: true,
            //     options: {
            //       legend: {display: false},
            //       scales: {
            //         xAxes: [{ticks: {min: 0, max:12}}],
            //         yAxes: [{ticks: {min: 0, max:20}}],
            //       }
            //     }
            //   });


            
        });
    });


});

// callback function declaration
function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}