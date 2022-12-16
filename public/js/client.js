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
        xhr.open("GET", url);
        xhr.send();
    }

    // document.querySelector("#get-names-json").addEventListener("click", function (e){
    //     ajaxGET("/get_names?format=json", function (data) {
    //         // this call is JSON so we have to parse it:
    //         let parsedData = JSON.parse(data);
    //         something = parsedData;

    //         let str = "<ol>"
    //         for (let i = 0; i < parsedData.length; i++) {
    //             str += "<li>" + parsedData[i] + "</li>";
    //         }
    //         str += "</ol>";
    //         document.querySelector("#names-info").innerHTML += str;
    //     });
    // });

    // document.querySelector("#get-names-html").addEventListener("click", function (e){
    //     ajaxGET("/get_names?format=html", function (data) {
    //         document.querySelector("#names-info").innerHTML += data;
    //     });
    // });


    // document.querySelector("#clear").addEventListener("click", function (e){
    //     document.getElementById("names-info").innerHTML = "";
    // });

    document.querySelector("#get-schedule").addEventListener("click", function (e){

        let button = document.querySelector("#get-schedule"); 
        if (button.textContent === "See schedule"){
            ajaxGET("/get_schedule?format=html", function (data) {
                document.querySelector("#schedule-info").innerHTML = data;
                $("#schedule-info1").slideUp(0);
                $("#schedule-info1").slideDown(1000);

            });
            button.textContent = "Hide schedule"
        } 
        else if (button.textContent === "Hide schedule"){
            $("#schedule-info1").slideUp(1000);
            button.textContent = "See schedule"
        }
    });


    $(document).ready(function(){
        $("#slide-up").click(function(){
          $("#schedule-info1").slideUp(1000);
        });
        $("#slide-down").click(function(){
          $("#schedule-info1").slideDown(1000);
        });
      });
    // document.querySelector("#get-times-tables").addEventListener("click", function (e){
    //     let n = document.getElementById("number-input").value;
    //     ajaxGET("/get_times_tables?n="+n, function (data) {
    //         console.log(data)
    //         document.querySelector("#times-tables-info").innerHTML += data;
    //     });
    // });


    document.querySelector("#get-curr-temp").addEventListener("click", function (e){
        ajaxGET("/get_curr_temp", function (data) {
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