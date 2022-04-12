//cors server
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
// openWeather api key: 56de1eb517b3c48fb6839f0e3a51dbfb
var formEl= $("#cityPicker");
var listContainer= $(".cityDrop");
var titleContainer= $(".cCityTitle");
var fivedayContainer= $(".cCity");

var city;

function init(){
    
}


function grabLocation(str){
    clearContent();
    city= str;
    var cUrl= city.replace(" ","");
    var url= "http://api.openweathermap.org/geo/1.0/direct?q="+ cUrl +",&appid=56de1eb517b3c48fb6839f0e3a51dbfb";
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var lat= data[0].lat;
        var lon= data[0].lon;
        parseCurrent(lat,lon);
    });
}

function parseCurrent(x,y){
   var url="https://api.openweathermap.org/data/2.5/onecall?lat="+x+"&lon="+y+"&units=imperial&appid=56de1eb517b3c48fb6839f0e3a51dbfb"; 
   fetch(url)
   .then(function(response){
       return response.json();
   })
   .then(function(data){
        console.log(data);
        var currObj={
            name: city,
            date: makeDate(data.current.dt),
            temp: data.current.temp,
            wind: data.current.wind_speed,
            humidity: data.current.humidity,
            uvI: data.current.uvi
        };
        console.log(data.current.dt);
        parseHistoric(x,y, data.current.dt);
        displayCContent(currObj);
   });
}

function parseHistoric(x,y,z){
    for(i=0;i<5; i++){
        z-= 86400;
        var url="https://api.openweathermap.org/data/2.5/onecall/timemachine?lat="+x+"&lon="+y+"&dt="+ z +"&units=imperial&appid=56de1eb517b3c48fb6839f0e3a51dbfb"; 
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
             console.log(data);
             var hObj={
                date: makeDate(data.current.dt),
                temp: data.current.temp,
                wind: data.current.wind_speed,
                humidity: data.current.humidity
            };
        displayHContent(hObj);
        });
    }
}

function makeDate(x){
    var unix = x;
    var milliseconds = unix * 1000;
    var dateObject = new Date(milliseconds);
    var date= dateObject.toLocaleString("en-US", {timeZoneName: "short"});
    date= date.substring(0,8);
    return date;
}

function displayCContent(x){
    console.log(x);
    var header= document.createElement("h2");
    header.innerHTML= x.name+" ("+x.date+")";
    var weatherList= document.createElement("ul");
    var temperature= document.createElement("li");
    temperature.innerHTML= x.temp+" °F";
    var windSp= document.createElement("li");
    windSp.innerHTML= x.wind+" MPH";
    var humid= document.createElement("li");
    humid.innerHTML= x.humidity+" %";
    var UV= document.createElement("li");
    UV.innerHTML= x.uvI;
    titleContainer.append(header);
    titleContainer.append(weatherList);
    weatherList.append(temperature);
    weatherList.append(windSp);
    weatherList.append(humid);
    weatherList.append(UV);

    var cButton= document.createElement("button");
    cButton.innerHTML= x.name;
    cButton.setAttribute("id", "cityBtn");
    listContainer.append(cButton);
}

function displayHContent(x){
    var card= document.createElement("div");
    var header= document.createElement("h2");
    header.innerHTML= "("+x.date+")";
    var weatherList= document.createElement("ul");
    var temperature= document.createElement("li");
    temperature.innerHTML= x.temp+" °F";
    var windSp= document.createElement("li");
    windSp.innerHTML= x.wind+" MPH";
    var humid= document.createElement("li");
    humid.innerHTML= x.humidity+" %";
    fivedayContainer.append(card);
    card.append(header);
    card.append(weatherList);
    weatherList.append(temperature);
    weatherList.append(windSp);
    weatherList.append(humid);
}

formEl.on("submit", function(event){
    event.preventDefault();
    var city= $(formEl).children().eq(0).val();
    grabLocation(city);
    formEl.children().eq(0).val("");
});

$("#cityBtn").on("click", function(event){
    var city= event.target.text();
    console.log(event.target.text());
    grabLocation(city);
}); 

function clearContent(){
    titleContainer.empty();
    fivedayContainer.empty();
}

init();